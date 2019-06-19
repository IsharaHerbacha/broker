# Explications rapides
On crée les topics avant de pouvoir les utiliser

#A installer au préalable
## installer kafka
Télécharger la version [ 2.2.0](https://www.apache.org/dyn/closer.cgi?path=/kafka/2.2.0/kafka_2.12-2.2.0.tgz)
`tar -xzf kafka_2.12-2.2.0.tgz`
`cd kafka_2.12-2.2.0`



# Quickstart
* Lancer un zookeeper avec `bin/zookeeper-server-start.sh config/zookeeper.properties`
* Lancer un kafka : `bin/kafka-server-start.sh config/server.properties`
* Lancer le producteur et consommateur
  * node ../consumer.js
  * node ../producer.js