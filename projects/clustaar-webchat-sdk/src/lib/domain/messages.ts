export interface JoinStatusMessage {
  status: string;
  control: boolean;
}

export interface InterlocutorReplyMessage {
  token: string;
  params?: {
    display: boolean,
    debug: number
  };
  body?: {
    type: string,
    message: string
  };
}

export interface BotReplyMessage {
  body: {
    data: {
      input: {
        message: string,
        type: string
      }
      interlocutor: {
        id: string,
        type: string
      }
    }
  };
  status: number;
}

export interface AgentReplyMessage {
  body: {
    message: string,
    type: string
  };
  timestamp: number;
}

export interface ControlMessage {
  at: number;
  value: boolean;
}
