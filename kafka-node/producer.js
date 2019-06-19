var kafka = require("kafka-node");
const kafka_topic = "topicoast";

var bodyParser = require("body-parser");

var Producer = kafka.Producer,
  client = new kafka.KafkaClient(),
  producer = new Producer(client);

var topicsToCreate = [
  {
    topic: "topicoast",
    partitions: 1,
    replicationFactor: 1
  },
  {
    topic: "topishara",
    partitions: 1,
    replicationFactor: 1
  }
];

client.createTopics(topicsToCreate, (error, result) => {
  if (error) {
    console.log("Les topics n'ont pas été créés :", error);
  } else {
    console.log("Les topics ont été crées");
  }
});

let payloads = [
  {
    topic: kafka_topic,
    messages: `Coucou topicoast`
  }
];

producer.on("ready", function() {
  let push_msg = producer.send(payloads, (err, data) => {
    if (err) {
      console.log("Le message n'a pas été envoyé sur ", kafka_topic);
    } else {
      console.log("Le message a bien été envoyé sur", kafka_topic);
    }
  });
});

producer.on("error", function(err) {
  console.log("Producer is in error state");
  console.log(err);
});
