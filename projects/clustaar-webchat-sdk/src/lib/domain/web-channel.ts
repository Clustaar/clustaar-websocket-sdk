import { Channel } from 'phoenix';
import { Observable } from 'rxjs';
import {
  AgentReplyMessage,
  BotReplyMessage,
  ControlMessage,
  InterlocutorReplyMessage,
  JoinStatusMessage
} from './messages';


export class WebChannel {

  constructor(private channel: Channel) {
  }

  onBotReply(): Observable<BotReplyMessage> {
    return this.on<BotReplyMessage>('bot_reply');
  }

  onAgentReply(): Observable<AgentReplyMessage> {
    return this.on<AgentReplyMessage>('agent_reply');
  }

  onInterlocutorReply(): Observable<InterlocutorReplyMessage> {
    return this.on<InterlocutorReplyMessage>('interlocutor_reply');
  }

  onControlTaken(): Observable<ControlMessage> {
    return this.on<ControlMessage>('control');
  }

  join(): Observable<JoinStatusMessage> {
    return new Observable(observer => {
      this.channel.join()
        .receive('ok', (res) => {
          observer.next({ status: 'ok', control: res ? res.control : false });
          observer.complete();
        })
        .receive('error', (res) => observer.error(res));
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

  sendReply(data: InterlocutorReplyMessage): void {
    this.emit('interlocutor_reply', data);
  }

  private emit(event: string, data?: InterlocutorReplyMessage): void {
    this.channel.push(event, data);
  }

  private on<T>(event: string): Observable<T> {
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
}
