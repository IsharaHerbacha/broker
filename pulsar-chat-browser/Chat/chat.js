"use strict";

let newLineMessage;
let newTime;

let topic = "";
let userName = "";
let socketEcoute;
let socketPost;

//Ajout des eventHandler pour appui de bouton Entrée
pushEntry("newMessageContent", "sendButton");
pushEntry("topicName", "redirectButton");
pushEntry("userName", "redirectButton");

// CONNEXION
function redirect() {
  topic = document.getElementById("topicName").value;
  userName = document.getElementById("userName").value;
  if (topic !== "") {
    if (userName !== "") {
      createSocket(topic, userName);

      displayChat(topic);
      behaveSocketEcoute(socketEcoute);
      behaveSocketPost(socketPost);
    } else {
      alert("Vous devez mettre un nom d'utilisateur !");
    }
  } else {
    alert("Vous devez mettre un nom de chat !");
  }
}

// Création des sockets pour poster et écouter
function createSocket(topic, userName) {
  socketEcoute = new WebSocket(
    "ws://localhost:8080/ws/v2/reader/persistent/public/default/" +
      topic +
      "/?messageId=earliest&readerName=" +
      userName
  );

  socketPost = new WebSocket(
    "ws://localhost:8080/ws/v2/producer/persistent/public/default/" +
      topic +
      "/?producerName=" +
      userName
  );
}

// On enleve l'affichage du login et on met celui du chat
function displayChat(topic) {
  document.getElementById("login").style = "display:none;";
  document.getElementById("contenu").style = "display:block;";
  document.getElementById("topicTitle").textContent = `Chat : ${topic}`;
}

function behaveSocketEcoute(socketEcoute) {
  // RECEPTION MESSAGE
  socketEcoute.onmessage = function(message) {
    const receiveMsg = JSON.parse(message.data);
    // PRINT INFO MESSAGE
    console.log(receiveMsg);

    // Ajout du message sur une nouvelle ligne
    addLine(
      newLineMessage,
      "message",
      `(${receiveMsg.properties.user}) :   ${atob(receiveMsg.payload)}`,
      "messageList"
    );
    //Ajout du temps
    addLine(newTime, "timeMessage", receiveMsg.publishTime, "timeList");

    const ackMsg = { messageId: receiveMsg.messageId };
    socketEcoute.send(JSON.stringify(ackMsg));
  };

  socketEcoute.onerror = function(err) {
    console.log(err);
    alert("Problème message");
  };
}

function behaveSocketPost(socketPost) {
  socketPost.onerror = function(err) {
    console.log(err);
    alert("Le message n'a pas pu être posté. \n Veuillez réessayer.");
  };

  // reception de messages, le producteur ne recevra que des acks
  socketPost.onmessage = function(message) {
    console.log("ack received : ", message);
  };
}

function addLine(elemToAdd, className, innerContent, idParent) {
  elemToAdd = document.createElement("div");
  elemToAdd.className = className;
  elemToAdd.innerHTML = innerContent;
  document.getElementById(idParent).appendChild(elemToAdd);
  document.getElementById(idParent).insertAdjacentHTML("beforeend", "<br>");
}

// POST MESSAGES
function sendMessage() {
  const inputMessage = document.getElementById("newMessageContent").value;
  console.log(inputMessage);
  const message = {
    payload: btoa(inputMessage), //required
    properties: {
      // optionnal
      user: userName
    }
  };
  socketPost.send(JSON.stringify(message));
  document.getElementById("newMessageContent").value = "";
}

function pushEntry(idParent, callBackFunction) {
  const input = document.getElementById(idParent);
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById(callBackFunction).click();
    }
  });
}
