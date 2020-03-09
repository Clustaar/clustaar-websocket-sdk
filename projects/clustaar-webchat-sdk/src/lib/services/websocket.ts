import { Socket } from 'phoenix';
import { WebChannel } from './web-channel';
import { Observable } from 'rxjs';

export class Websocket {

  private _socket: Socket;

  private static instance: Websocket;

  /** Singleton pattern in order to avoid to
   * open multiple socket at the same time **/
  private constructor() {
  }

  static getInstance(): Websocket {
    if (!Websocket.instance) {
      Websocket.instance = new Websocket();
    }
    return Websocket.instance;
  }

  channel(topic: string, params: object): WebChannel {
    return new WebChannel(this._socket.channel(topic, params));
  }

  connect(environment: string) {
    this._socket = new Socket(environment);
    this._socket.connect();
  }

  disconnect() {
    console.log(this._socket.connectionState());
    if (this._socket) {
      this._socket.disconnect(() => {
        console.log("disconnected");
        console.log(this._socket.connectionState());
      });
    }
  }

  onConnectionState() {
    return new Observable(observer => {
      this._socket.onOpen(() => {
        observer.next('open');
      });
      this._socket.onClose(() => {
        observer.next('close');
      });
      this._socket.onError(() => {
        observer.next('error');
      });
      this._socket.onMessage(() => {
        observer.next('message');
      })
    });
  }
}
