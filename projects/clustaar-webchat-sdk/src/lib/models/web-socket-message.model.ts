export interface InterlocutorReplyMessage {
    token: string;
    params?: any;
    body?: {
      type: string,
      message: string
    };
}

export interface BotReplyMessage {
    status: number;
    body: any;
    type: string;
}
