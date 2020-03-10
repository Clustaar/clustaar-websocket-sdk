import { Socket } from 'phoenix';
import { WebChannel } from './web-channel';
import { Observable } from 'rxjs';

// @dynamic
export class WebSocket {

  private static instance: WebSocket;

  private socket: Socket;

  // Singleton pattern in order to avoid to open multiple socket at the same time
  private constructor() {
  }

  static getInstance(): WebSocket {
    if (!WebSocket.instance) {
      WebSocket.instance = new WebSocket();
    }
    return WebSocket.instance;
  }

  channel(topic: string, params: { bot_id: string, socketToken: string }): WebChannel {
    return new WebChannel(this.socket.channel(topic, params));
  }

  connect(environment: string): void {
    this.socket = new Socket(environment);
    this.socket.connect();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  onConnectionState(): Observable<string> {
    return new Observable(observer => {
      this.socket.onOpen(() => {
        observer.next('open');
      });
      this.socket.onClose(() => {
        observer.next('close');
      });
      this.socket.onError(() => {
        observer.next('error');
      });
    });
  }
}
