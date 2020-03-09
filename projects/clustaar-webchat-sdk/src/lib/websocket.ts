import { Socket } from 'phoenix';
import { WebChannel } from './web-channel';
import { API } from '../../../../environments/environment';

export class Websocket {

    private endPoint = API.websocketUrl;

    private _socket: Socket;

    private static instance: Websocket;

    /** Singleton pattern in order to avoid to
     * open multiple socket at the same time **/
    private constructor() {
    }

    static getInstance(): Websocket {
        if (!Websocket.instance) {
            Websocket.instance = new Websocket();
        } else {
            Websocket.instance.disconnect();
            Websocket.instance = new Websocket();
        }
        return Websocket.instance;
    }

    channel(topic: string, params: object): WebChannel {
        return new WebChannel(this._socket.channel(topic, params));
    }

    connect() {
        this._socket = new Socket(this.endPoint);
        this._socket.connect();
    }

    disconnect() {
        if (this._socket) {
            this._socket.disconnect();
        }
    }
}
