// reader
"use strict";
let topic =
    "ws://localhost:8080/ws/v2/reader/persistent/public/default/topicoast/?messageId=earliest", // on précise à partir de quel messageid on commence à lire
  ws1 = new WebSocket(topic);

topic =
  "ws://localhost:8080/ws/v2/reader/persistent/public/default/topishara/?messageId=earliest";
let ws2 = new WebSocket(topic);

let sockets = [ws1, ws2];

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
