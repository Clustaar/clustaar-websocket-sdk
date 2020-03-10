import { Component } from '@angular/core';
import { ClustaarWebChatService } from '../../../clustaar-webchat-sdk/src/lib/services/clustaar-web-chat.service';
import { InterlocutorReplyMessage } from '../../../clustaar-webchat-sdk/src/lib/domain/messages';
import { WebChannel } from '../../../clustaar-webchat-sdk/src/lib/domain/web-channel';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div><span>State : {{state}}</span></div>
    <div><span>Control : {{control}}</span></div>
    <div>
      <input #message type="text" value="">
      <button (click)="sendMessage(message.value)">send</button>
      <button (click)="join()">join</button>
      <button (click)="leave()">leave</button>
      <button (click)="disconnect()">disconnect</button>
      <button (click)="connect()">connect</button>
    </div>`
})
export class AppComponent {
  botID = '5b50b57f64a5470032c98636';
  botToken = 'eyJ2YWx1ZSI6ImpncGVmcWh6S1BQUkJBdE1YSHRDYXFyLXJ5blFYU3B0QUZ2LVJFemoxQ00iLCJzdWJqZWN0Ijp7InR5cGUiOiJib3QiLCJpZCI6IjViNTBiNTdmNjRhNTQ3MDAzMmM5ODYzNiJ9fQ==';
  interlocutorID = '5e398d3857d5f3000b82e4c0';
  socketToken = 'melosockmelosockmelosockmelosockmelosockmelosockmelosockmelosockmelosockmelosock';
  interlocutorChannel: WebChannel;
  clustaarWebchatSdkService: ClustaarWebChatService = new ClustaarWebChatService({
    environment: 'wss://sockets.staging.clustaar.io/socket'
  });
  interlocutorChannelSubject: Subject<any>;
  state: string;
  control: boolean;

  constructor() {

    this.connect();

    this.clustaarWebchatSdkService.onConnectionState().subscribe((state) => {
      this.state = state;
    });

    this.join();

  }

  sendMessage(message) {
    const interlocutorMessage: InterlocutorReplyMessage = {
      token: this.botToken,
      params: {
        display: true,
        debug: 1
      },
      body: {
        type: 'text',
        message
      }
    };

    this.interlocutorChannel.sendReply(interlocutorMessage);
  }

  connect() {
    this.clustaarWebchatSdkService.connect();
  }

  disconnect() {
    this.clustaarWebchatSdkService.disconnect();
  }

  join() {

    this.interlocutorChannel = this.clustaarWebchatSdkService.interlocutorChannel({
      botID: this.botID,
      interlocutorID: this.interlocutorID,
      socketToken: this.socketToken
    });

    this.interlocutorChannelSubject = new Subject();
    this.interlocutorChannel.join().pipe(takeUntil(this.interlocutorChannelSubject)).subscribe((status) => {
      this.control = status.control;

      this.interlocutorChannel.onBotReply().pipe(takeUntil(this.interlocutorChannelSubject)).subscribe((botReply) => {
        console.log(botReply, 'botReply');
      });

      this.interlocutorChannel.onAgentReply().pipe(takeUntil(this.interlocutorChannelSubject)).subscribe((agentReply) => {
        console.log(agentReply, 'agentReply');
      });

      this.interlocutorChannel.onInterlocutorReply().pipe(takeUntil(this.interlocutorChannelSubject)).subscribe((interlocutorReply) => {
        console.log(interlocutorReply, 'interlocutorReply');
      });

      this.interlocutorChannel.onControl().pipe(takeUntil(this.interlocutorChannelSubject)).subscribe((control) => {
        this.control = control.value;
      });
    });
  }

  leave() {
    this.interlocutorChannel.leave().subscribe(() => {
      this.interlocutorChannelSubject.next();
      this.interlocutorChannelSubject.complete();
    });
  }
}
