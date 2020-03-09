import { Injectable } from '@angular/core';
import { Websocket } from './websocket';
import { WebChannel } from './web-channel';

@Injectable()
export class WebsocketService {

    private socket: Websocket;

    constructor() {
        this.socket = Websocket.getInstance();
    }

    connect() {
        this.socket.connect();
    }

    disconnect() {
        this.socket.disconnect();
    }

    channel(topic: string, params: { bot_id: string, socketToken: string }): WebChannel {
        return this.socket.channel(topic, params);
    }
}

