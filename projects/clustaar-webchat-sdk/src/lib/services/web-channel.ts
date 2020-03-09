import { Channel } from 'phoenix';
import { Observable } from 'rxjs';
import { InterlocutorReplyMessage } from '../models/web-socket-message.model';

export class WebChannel {

  constructor(private channel: Channel) {
  }

  onBotReply(): Observable<any> {
    return this.on('bot_reply');
  }

  onAgentReply(): Observable<any> {
    return this.on('agent_reply');
  }

  onInterlocutorReply(): Observable<any> {
    return this.on('interlocutor_reply');
  }

  onControl(): Observable<any> {
    return this.on('control');
  }

  join(): Observable<{ status: string, control: boolean }> {
    return new Observable(observer => {
      this.channel.join()
        .receive('ok', (res) => {
          observer.next({ status: 'ok', control: res ? res.control : false });
          observer.complete();
        })
        .receive('error', (res) => observer.error(res));
    });
  }

  private emit(event: string, data?: InterlocutorReplyMessage) {
    this.channel.push(event, data);
  }

  send(data: InterlocutorReplyMessage) {
    this.emit('interlocutor_reply', data);
  }

  private on(event: string): Observable<any> {
    return new Observable(observer => {
      this.channel.on(event, data => {
        if (data.status === undefined) {
          observer.next(data.body || data);
        } else if (data.status === 200) {
          observer.next(data.body.data);
        } else {
          observer.error(data.body.error);
        }
      });
      // dispose of the event listener when unsubscribed
      return () => this.channel.off(event);
    });
  }

  leave(): Observable<string> {
    return new Observable(observer => {
      this.channel.leave()
        .receive('ok', () => {
          observer.next('ok');
          observer.complete();
        })
        .receive('error', (res) => observer.error(res));
    });
  }
}
