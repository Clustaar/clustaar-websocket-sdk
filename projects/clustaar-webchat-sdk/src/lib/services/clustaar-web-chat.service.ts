import { Configuration } from '../domain/configuration';
import { WebSocket, WebSocketState } from '../domain/web-socket';
import { WebChannel } from '../domain/web-channel';
import { Observable } from 'rxjs';

export class ClustaarWebChatService {
  constructor(private configuration: Configuration) {}

  isConnected(): boolean {
    return WebSocket.getInstance().isConnected();
  }

  connect(): void {
    WebSocket.getInstance().connect(this.configuration.environment);
  }

  disconnect(): void {
    WebSocket.getInstance().disconnect();
  }

  onConnectionState(): Observable<WebSocketState> {
    return WebSocket.getInstance().onConnectionState();
  }

  interlocutorChannel(params: {
    botID: string;
    interlocutorID: string;
    socketToken: string;
    origin?: string;
  }): WebChannel {
    const topic = `interlocutor:${params.interlocutorID}`;
    return WebSocket.getInstance().channel(topic, {
      bot_id: params.botID,
      socketToken: params.socketToken,
      origin: params.origin
    });
  }
}
