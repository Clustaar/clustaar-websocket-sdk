import { Configuration } from './models/configuration.model';
import { Websocket } from './services/websocket';
import { WebChannel } from './services/web-channel';

export class ClustaarWebchatSdkService {

  constructor(private configuration: Configuration) {
    console.log(configuration);
  }

  connect() {
    Websocket.getInstance().connect(this.configuration.environment);
  }

  interlocutorChannel(params: { botID: string, interlocutorID: string, socketToken: string }): WebChannel {
    const topic = `interlocutor:${params.interlocutorID}`;
    return this.channel(topic, { bot_id: params.botID, socketToken: params.socketToken });
  }

  channel(topic: string, params: { bot_id: string, socketToken: string }): WebChannel {
    return Websocket.getInstance().channel(topic, params);
  }

  onConnectionState() {
    return Websocket.getInstance().onConnectionState();
  }

}
