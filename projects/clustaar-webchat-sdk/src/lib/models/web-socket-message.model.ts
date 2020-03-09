export interface InterlocutorReplyMessage {
    token: string;
    params?: any;
    body?: any;
}

export interface BotReplyMessage {
    status: number;
    body: any;
    type: string;
}
