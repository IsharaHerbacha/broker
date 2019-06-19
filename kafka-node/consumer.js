var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient(),
  consumer = new Consumer(client, [{ topic: "topicoast", offset: 0 }], {
    autoCommit: false
  });

consumer.on("message", function(message) {
  //console.log(message);
  console.log("Message : ", message.value);
  console.log("Offset: ", message.offset);
  //console.log(consumer.client);
});

consumer.on("error", function(err) {
  console.log("Error:", err);
});

consumer.on("offsetOutOfRange", function(err) {
  console.log("offsetOutOfRange:", err);
});
