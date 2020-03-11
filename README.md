# Clustaar Websocket Sdk

Clustaar Websocket SDK is a Javascript library to simply the implementation of websocket communication between your application and Clustaar API. 

This library encapsulate technical and business logic of Clustaar Chatbot Take Control feature.

* Official website: [clustaar.com/](https://clustaar.com/)
* Developer documentation: [clustaar.com/developpers/](https://clustaar.com/developpers/)
* API Documentation: [docs.bots.clustaar.com/](http://docs.bots.clustaar.com/)

## Table of contents
* [Infrastructure](#infrastructure)
* [Installation](#installation)
* [How to Use](#how-to-use)

## Infrastructure

![Clustaar Websocket communication schema](docs/assets/schema.png "Clustaar Websocket communication schema")

This project is created with:
* Elixir Phoenix framework: [phoenixframework.org/](https://www.phoenixframework.org/)
* RxJS: [rxjs.dev/](https://rxjs.dev/)

## Installation

Run `npm install clustaar-webchat-sdk --save`

## How to Use

### Initiate Web Socket connection

```javascript
import { ClustaarWebChatService } from 'clustaar-webchat-sdk';

const service = new ClustaarWebChatService({
    environment: URL
});
service.connect()
```

### Joining a Channel

```javascript
const channel = service.interlocutorChannel({
  botID: BOT_ID,
  interlocutorID: INTERLOCUTOR_ID,
  socketToken: SOCKET_TOKEN
});

channel.join().subscribe((status) => {
})
````

### Send an Interlocutor Reply

```javascript
channel.sendReply(BOT_TOKEN, { type: 'text', message: 'Hello World' });
````

### Send an Custom Event

```javascript
channel.sendReply(BOT_TOKEN, { type: 'custom_event', name: 'My Custom Event' });
````


### Listening Channel events

```javascript
// Listening Bot Replies
channel.onBotReply().subscribe((botReply) => {
});

// Listening Agent Replies
channel.onAgentReply().subscribe((agentReply) => {
});

// Listening Interlocutor Replies
channel.onInterlocutorReply().subscribe((interlocutorReply) => {
});

// Listening Control Taken Events
channel.onControlTaken().subscribe((controlTaken) => {
});
```

### Listening Web Socket events

```javascript
// State can be : 'open', 'close' or 'error'
service.onConnectionState().subscribe((state) => {
});
````

