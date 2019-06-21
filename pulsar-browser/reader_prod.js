// reader multi topics qui envoie des messages
"use strict";
let browser = prompt("Sur quel navigateur etes-vous ?");

let topics = prompt(
  "Quel(s) topic(s) voulez-vous ecoutez ? (separer les noms par des virgules)"
).split(",");

let prodBool = prompt(
  "Voulez vous poster un message ? (répondre oui ou non)",
  "non"
);

//console.log(topics);

let sockets = topics.map(name => {
  return new WebSocket(
    "ws://localhost:8080/ws/v2/reader/persistent/public/default/" +
      name.trim() +
      "/?messageId=earliest"
  );
});

// console.log(sockets);

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

if (prodBool.trim() === "oui") {
  let topiname = prompt("Sur quel topic ?");
  let ws = new WebSocket(
    "ws://localhost:8080/ws/v2/producer/persistent/public/default/" + topiname
  );

  let messageToSend = prompt("Quel est votre message ?");

  let message = {
    payload: btoa(
      messageToSend + " ,envoye depuis " + browser + " vers " + topiname
    ), //required
    properties: {
      // optionnal
      user: "ishara"
    }
  };
  ws.onopen = function() {
    // Send multiple messages
    ws.send(JSON.stringify(message));
  };

  // handle error
  ws.onerror = function() {
    console.log("error");
  };

  // reception de messages, le producteur ne recevra que des acks
  ws.onmessage = function(message) {
    console.log("ack received : ", message);
  };
}
