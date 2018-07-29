exports.run = (client, msg, args) => {
  var list = msg.mentions.members;
  if (list.first() === null || list.first() === undefined) {
    msg.channel.send({embed: {
            color: client.color,
            description: "Please list a user to slap!"
    }}).then(msg => {msg.delete(2000)});
  }
  if (list.first().user.bot) return;
  else if (list.firstKey() === msg.author.id) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ You can't slap yourself!"
    }}).then(msg => {msg.delete(2000)});
  }
  else {
    var urls = ["https://media1.tenor.com/images/0a3e109296e16977a61ed28c1e5bf7bf/tenor.gif?itemid=5122897",
               "https://media1.tenor.com/images/1cf84bf514d2abd2810588caf7d9fd08/tenor.gif?itemid=7679403",
               "https://media1.tenor.com/images/9ea4fb41d066737c0e3f2d626c13f230/tenor.gif?itemid=7355956",
               "https://media1.tenor.com/images/d83626e7031b78c1fde67ccedc43ec01/tenor.gif?itemid=4880762",
               "https://media1.tenor.com/images/b6d8a83eb652a30b95e87cf96a21e007/tenor.gif?itemid=10426943",
               "https://i.imgur.com/KXIAhVM.gif", "https://i.imgur.com/7nbLn5K.gif", "https://i.imgur.com/pClW25Z.gif",
               "https://i.imgur.com/pClW25Z.gif"];
    var choice = Math.floor(Math.random() * urls.length);
    var sender = msg.author.id;
    var receiver = list.firstKey(1);
    console.log(sender, receiver);
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setImage(urls[choice]).setDescription(`💢 <@${sender}> has slapped <@${receiver}>!\n(*｀Ω´*)`));
  }
}