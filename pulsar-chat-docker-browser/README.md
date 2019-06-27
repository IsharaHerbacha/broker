Pull les images de docker hub :
`$ sudo docker pull apachepulsar/pulsar-standalone`
`$ sudo docker pull apachepulsar/pulsar-dashboard`

Pour lancer sur docker :
  Se placer dans le dossier dock
  `$ sudo docker-compose up`

  NOTE : il faudra peut-être changer la ligne `$PWD/../pulsar/data:/pulsar/data` suivant où votre pulsar se trouve sinon les données ne seront pas conservées !

  Lancer des chats dessus avec le Chat/chat.html (ou le Chat/tableau/chat.html qui est beaucoup moins beau).
  Note : il est préferable de les lancer avec Firefox pour l'aspect visuel

