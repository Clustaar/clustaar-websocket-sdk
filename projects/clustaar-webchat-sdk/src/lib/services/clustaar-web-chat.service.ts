import { Configuration } from '../domain/configuration';
import { WebSocket } from '../domain/web-socket';
import { WebChannel } from '../domain/web-channel';
import { Observable } from 'rxjs';

export class ClustaarWebChatService {

  constructor(private configuration: Configuration) {
  }

  connect(): void {
    WebSocket.getInstance().connect(this.configuration.environment);
  }

  disconnect(): void {
    WebSocket.getInstance().disconnect();
  }

  interlocutorChannel(params: { botID: string, interlocutorID: string, socketToken: string }): WebChannel {
    const topic = `interlocutor:${params.interlocutorID}`;
    return this.channel(topic, { bot_id: params.botID, socketToken: params.socketToken });
  }

  channel(topic: string, params: { bot_id: string, socketToken: string }): WebChannel {
    return WebSocket.getInstance().channel(topic, params);
  }

  onConnectionState(): Observable<string> {
    return WebSocket.getInstance().onConnectionState();
  }

}
