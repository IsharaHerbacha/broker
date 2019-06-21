// consumer multi-topics
"use strict";

let subName = prompt("Votre nom ?", "nom");

let topics = prompt(
  "Quel(s) topic(s) voulez-vous ecoutez ? (separer les noms par des virgules"
).split(",");

//console.log(topics);

let sockets = topics.map(name => {
  return new WebSocket(
    "ws://localhost:8080/ws/v2/reader/persistent/public/default/" +
      name.trim() +
      "/" +
      subName
  );
});

// console.log(sockets);

for (let socket of sockets) {
  socket.onmessage = function(message) {
    var receiveMsg = JSON.parse(message.data);
    //console.log(receiveMsg);
    console.log(
      "Received msg id : " +
        receiveMsg.messageId +
        " at " +
        receiveMsg.publishTime +
        ","
    );
    console.log("Received payload: %s", atob(receiveMsg.payload));
    //console.log("url " + socket.url);
    var ackMsg = { messageId: receiveMsg.messageId };
    socket.send(JSON.stringify(ackMsg));
  };

  socket.onerror = function(err) {
    console.log(err);
  };
}
