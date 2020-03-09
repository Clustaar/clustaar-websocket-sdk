import { Channel } from 'phoenix';
import { Observable } from 'rxjs';
import { InterlocutorReplyMessage } from '@clustaar/models/web-socket-message.model';

export class WebChannel {

    constructor(private channel: Channel) {
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

    emit(event: string, data?: InterlocutorReplyMessage) {
        this.channel.push(event, data);
    }

    on(event: string): Observable<any> {
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
