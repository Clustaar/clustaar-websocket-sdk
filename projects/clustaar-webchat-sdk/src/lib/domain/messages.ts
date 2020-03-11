interface ReplyMessage {
  token: string;
  params?: {
    display: boolean,
    debug: number
  };
}

export interface InterlocutorReplyMessage extends ReplyMessage {
  body: {
    type: string,
    message: string
  };
}

export interface CustomEventReplyMessage extends ReplyMessage {
  body: {
    type: string,
    name: string
  };
}

export interface BotReplyMessage {
  body: {
    data: {
      debug?: {
        intentDetections: {
          type: string,
          query: string,
          results: [
            {
              type: string,
              intent: {
                id: string,
                name: string
              },
              score: number,
              parameters: [
                {
                  name: string,
                  value: string
                }
              ]
            }
          ]
        }[],
        webhookCalls?: {
          request: {
            method: string,
            url: string,
            body: string
          },
          response: {
            status: number,
            body: string
          },
          error: string
        }[],
        logs?: {
          type: string,
          level: string,
          message: string,
          createdAt: string
        }[]
      },
      fulfillment: {
        actions: [],
        source: {
          type: string,
          step: {
            type: string,
            id: string,
            name: string
          }
        }
      },
      input: {
        type: string
        message: string,
      }
      interlocutor: {
        type: string
        id: string,
      },
      session: {
        values: {}
      }
    }
  };
  status: number;
}

export interface AgentReplyMessage {
  body: {
    type: string
    message: string,
  };
  timestamp: number;
}

export interface ControlTakenMessage {
  at: number;
  value: boolean;
}

export interface JoinStatusMessage {
  status: string;
  control: boolean;
}

