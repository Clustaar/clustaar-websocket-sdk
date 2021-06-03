import { Component } from '@angular/core';
import { ClustaarWebChatService } from '../../../clustaar-webchat-sdk/src/lib/services/clustaar-web-chat.service';
import { InterlocutorReplyMessage } from '../../../clustaar-webchat-sdk/src/lib/domain/messages';
import { WebChannel } from '../../../clustaar-webchat-sdk/src/lib/domain/web-channel';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <div><span>State : {{state}}</span></div>
    <div><span>Connected : {{connected}}</span></div>
    <div><span>Control : {{control}}</span></div>
    <div>
      <input #message type="text" value="">
      <button (click)="sendMessage(message.value)">send</button>
      <button (click)="join()">join</button>
      <button (click)="leave()">leave</button>
      <button (click)="service.disconnect()">disconnect</button>
      <button (click)="service.connect()">connect</button>
    </div>`
})
export class AppComponent {

  interlocutorChannelSubject$: Subject<any>;

  interlocutorChannel: WebChannel;
  service: ClustaarWebChatService;
  state: string;
  control: boolean;

  connected: boolean;

  constructor() {
    this.service = new ClustaarWebChatService({
      environment: environment.URL
    });
    this.service.connect();
    this.service.onConnectionState().subscribe((state) => {
      this.state = state;
    });
    interval(500).subscribe(() => {
      this.connected = this.service.isConnected();
    });
    this.join();
  }

  sendMessage(message: string) {
    const reply: InterlocutorReplyMessage = { type: 'text', message };
    this.interlocutorChannel.sendReply(environment.botToken, reply, 0, true, 'test');
  }

  join() {
    this.interlocutorChannel = this.service.interlocutorChannel({
      botID: environment.botID,
      interlocutorID: environment.interlocutorID,
      socketToken: environment.socketToken
    });

    this.interlocutorChannelSubject$ = new Subject();
    this.interlocutorChannel.join().pipe(takeUntil(this.interlocutorChannelSubject$)).subscribe((status) => {
      this.control = status.control;

      this.interlocutorChannel.onBotReply().pipe(takeUntil(this.interlocutorChannelSubject$)).subscribe((botReply) => {
        console.log(botReply, 'botReply');
      });

      this.interlocutorChannel.onAgentReply().pipe(takeUntil(this.interlocutorChannelSubject$)).subscribe((agentReply) => {
        console.log(agentReply, 'agentReply');
      });

      this.interlocutorChannel.onInterlocutorReply().pipe(takeUntil(this.interlocutorChannelSubject$)).subscribe((interlocutorReply) => {
        console.log(interlocutorReply, 'interlocutorReply');
      });

      this.interlocutorChannel.onControlTaken().pipe(takeUntil(this.interlocutorChannelSubject$)).subscribe((control) => {
        this.control = control.value;
      });
    });
  }

  leave() {
    this.interlocutorChannel.leave().subscribe(() => {
      this.interlocutorChannelSubject$.next();
      this.interlocutorChannelSubject$.complete();
    });
  }
}
