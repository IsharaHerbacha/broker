// reader multi topics qui envoie des messages
"use strict";
let topic =
    "ws://localhost:8080/ws/v2/reader/persistent/public/default/topicoast/?messageId=earliest", // on précise à partir de quel messageid on commence à lire
  ws1 = new WebSocket(topic);

topic =
  "ws://localhost:8080/ws/v2/reader/persistent/public/default/topishara/?messageId=earliest";
let ws2 = new WebSocket(topic);

let topicp =
    "ws://localhost:8080/ws/v2/producer/persistent/public/default/topishara", //pour produire des messages
  ws = new WebSocket(topicp);

let sockets = [ws1, ws2];

let message = {
  payload: btoa("Message d'un reader sur topishara")
};

let msg = [message];

for (let socket of sockets) {
  socket.onmessage = function(message) {
    var receiveMsg = JSON.parse(message.data);
    console.log(
      "Received msg id : " +
        receiveMsg.messageId +
        " at " +
        receiveMsg.publishTime +
        ","
    );
    console.log("Received payload: %s", atob(receiveMsg.payload));

    var ackMsg = { messageId: receiveMsg.messageId };
    socket.send(JSON.stringify(ackMsg));
  };

  socket.onerror = function(err) {
    console.log(err);
  };
}

// pour l'envoi de messages
ws.onopen = function() {
  // Send multiple messages
  for (let msgs of msg) {
    console.log(msgs);
    ws.send(JSON.stringify(msgs));
  }
};

// handle error
ws.onerror = function() {
  console.log("error");
};

// reception de messages, le producteur ne recevra que des acks
ws.onmessage = function(message) {
  console.log("ack received : ", message);
};
