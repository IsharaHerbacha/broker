//var WebSocket = require("ws"),
"use strict";

let userName = prompt("Tu es qui ?");
let topiname = prompt("Sur quel topic voulez-vous postez ?");

let topic =
    "ws://localhost:8080/ws/v2/producer/persistent/public/default/" +
    topiname +
    "/?batchingEnabled=true" +
    "&producerName=" +
    userName,
  ws = new WebSocket(topic);

async function sendMessage() {
  let messageToSend = await prompt("Quel est votre message ?");
  console.log();
  let message = await {
    payload: btoa(
      messageToSend + " ,envoye par " + userName + " vers " + topiname
    ), //required
    properties: {
      // optionnal
      user: "ishara"
    }
  };

  // pour l'envoi de messages
  ws.onopen = () => {
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

sendMessage();
