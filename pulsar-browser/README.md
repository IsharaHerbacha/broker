# Explications rapides
La différence entre le reader et le consumer est que le reader ne reçoit les messages que s'il est connecté quand les messages sont envoyés.

Création url :
* Pour un producteur:
  `ws://broker-service-url:8080/ws/v2/producer/persistent/:tenant/:namespace/:topic`
* Pour un consommateur:
  `ws://broker-service-url:8080/ws/v2/consumer/persistent/:tenant/:namespace/:topic/:subscription`
* Pour un lecteur:
  `ws://broker-service-url:8080/ws/v2/reader/persistent/:tenant/:namespace/:topic`

#A installer au préalable
## installer pulsar
`wget https://archive.apache.org/dist/pulsar/pulsar-2.3.2/apache-pulsar-2.3.2-bin.tar.gz`
`tar xvfz apache-pulsar-2.3.2-bin.tar.gz`
`cd apache-pulsar-2.3.2`
## configurer pour pouvoir utiliser une websocket
Dans conf/broker.conf mettre :
`webSocketServiceEnabled=true`

# Quickstart

Pour faire communiquer les consommateurs, readers et producteurs, il faut ouvrir les fichiers html dans un navigateur et regarder dans la console.

* Lancer un serveur avec `bin/pulsar standalone`
* Lancer la websocket (?) : `bin/pulsar-daemon start websocket`
* Au choix:
  * prod.html lance un producteur envoyant 2 messages sur topicoast
  * cons.html lance un consommateur lisant sur topicoast et topishara
  * reader.html lance un lecteur lisant sur topicoast et topishara
  * reader_prod.html lance un lecteur lisant sur topicoast et topishara et envoyant un message sur topishara