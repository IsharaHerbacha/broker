//var WebSocket = require("ws"),
"use strict";
let topic =
    "ws://localhost:8080/ws/v2/producer/persistent/public/default/topicoast",
  ws = new WebSocket(topic);

let message = {
  payload: btoa("Message du producteur à topicoast :D"), //required
  properties: {
    // optionnal
    user: "ishara"
  }
};

let message2 = {
  payload: btoa("HeHOOOOOOOOOOOOOOO topicoast")
};

let msg = [message, message2];

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
