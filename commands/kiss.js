exports.run = (client, msg, args) => {
  var list = msg.mentions.members;
  if (list.first() === null || list.first() === undefined) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ Please list a user to kiss!"
    }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
  }
  
  else if (list.first().user.bot) {
    return;
  }
  else if (list.firstKey() === msg.author.id) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ You can't kiss yourself!"
    }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
  }
  else {
    var urls = ["https://media1.tenor.com/images/e858678426357728038c277598871d6d/tenor.gif?itemid=9903014",
               "https://media1.tenor.com/images/896519dafbd82b9b924b575e3076708d/tenor.gif?itemid=8811697",
               "https://media1.tenor.com/images/a562410344e8b88fd737dfc9a4b6b1e1/tenor.gif?itemid=3560801",
               "https://media1.tenor.com/images/ea51c3a083c73bf81a3c5ee6d4165115/tenor.gif?itemid=11794176",
               "https://media1.tenor.com/images/6519e870af23780241a17e90ca91306d/tenor.gif?itemid=9881778"];
    var choice = Math.floor(Math.random() * urls.length);
    var sender = msg.author.id;
    var receiver = list.firstKey(1);
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setImage(urls[choice]).setDescription(`💕 <@${sender}> has kissed <@${receiver}>!\n( ˘ ³˘)♥`));
  }
}