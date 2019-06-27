"use strict";

let newLineMessage;
let newTDUser;
let newTDMsg;

let topic = "";
let userName = "";
let socketEcoute;
let socketPost;

// CONNEXION
function redirect() {
  topic = document.getElementById("topicName").value;
  userName = document.getElementById("userName").value;
  if (topic !== "") {
    if (userName !== "") {
      socketEcoute = new WebSocket(
        "ws://localhost:8080/ws/v2/reader/persistent/public/default/" +
          topic +
          "/?messageId=earliest"
      );

      socketPost = new WebSocket(
        "ws://localhost:8080/ws/v2/producer/persistent/public/default/" + topic
      );

      socketPost.onerror = function(err) {
        console.log(err);
        alert("Le message n'a pas pu être posté. \n Veuillez réessayer.");
      };

      // reception de messages, le producteur ne recevra que des acks
      socketPost.onmessage = function(message) {
        console.log("ack received : ", message);
      };

      // On enleve l'affichage du login et on met celui du chat
      document.getElementById("login").style = "display:none;";
      document.getElementById("contenu").style = "display:block;";
      document.getElementById("topicTitle").textContent = topic;

      // RECEPTION MESSAGE
      socketEcoute.onmessage = function(message) {
        var receiveMsg = JSON.parse(message.data);
        // PRINT INFO MESSAGE
        // console.log(atob(receiveMsg.payload));
        // console.log(receiveMsg.properties.user);
        // console.log(receiveMsg.publishTime);

        // Création du nouvel élément HTML
        newLineMessage = document.createElement("tr");
        newTDUser = document.createElement("td");
        newTDMsg = document.createElement("td");
        newLineMessage.className = "message";
        newTDUser.innerHTML = `${receiveMsg.properties.user}`;
        newTDMsg.innerHTML = `${atob(receiveMsg.payload)}`;
        // newLineMessage.innerHTML = `${receiveMsg.properties.user}:   ${atob(
        //   receiveMsg.payload
        // )}`; //       ${receiveMsg.publishTime}`;
        newLineMessage.appendChild(newTDUser);
        newLineMessage.appendChild(newTDMsg);
        document.getElementById("messageList").appendChild(newLineMessage);
        document
          .getElementById("messageList")
          .insertAdjacentHTML("beforeend", "<br>");
        var ackMsg = { messageId: receiveMsg.messageId };
        socketEcoute.send(JSON.stringify(ackMsg));
      };

      socketEcoute.onerror = function(err) {
        console.log(err);
        alert("Problème message");
      };
    } else {
      alert("Vous devez mettre un nom d'utilisateur !");
    }
  } else {
    alert("Vous devez mettre un nom de chat !");
  }
}

// POST MESSAGES

async function sendMessage() {
  let inputMessage = document.getElementById("newMessageContent").value;
  console.log(inputMessage);
  //let messageToSend = await prompt("Quel est votre message ?");
  let message = await {
    payload: btoa(inputMessage), //required
    properties: {
      // optionnal
      user: userName
    }
  };
  socketPost.send(JSON.stringify(message));
  inputMessage = document.getElementById("newMessageContent").value = "";
}

let inputMessage = document.getElementById("newMessageContent");
inputMessage.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("sendButton").click();
  }
});

let inputtopic = document.getElementById("topicName");
let inputUserName = document.getElementById("userName");

for (let button of [inputtopic, inputUserName]) {
  button.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("redirectButton").click();
    }
  });
}
