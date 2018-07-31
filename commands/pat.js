exports.run = (client, msg, args) => {
  var list = msg.mentions.members;
  if (list.first() === null || list.first() === undefined) {
    msg.channel.send({embed: {
            color: client.color,
            description: "Please list a user to pat!"
    }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
  }
  if (list.first().user.bot) return;
  else if (list.firstKey() === msg.author.id) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ You can't pat yourself!"
    }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
  }
  else {
    var urls = ["https://media1.tenor.com/images/116fe7ede5b7976920fac3bf8067d42b/tenor.gif?itemid=9200932", 
                "https://media1.tenor.com/images/28f4f29de42f03f66fb17c5621e7bedf/tenor.gif?itemid=8659513",
               "https://media1.tenor.com/images/291ea37382e1d6cd33349c50a398b6b9/tenor.gif?itemid=10204936",
               "https://media1.tenor.com/images/f5176d4c5cbb776e85af5dcc5eea59be/tenor.gif?itemid=5081286",
               "https://media1.tenor.com/images/bf646b7164b76efe82502993ee530c78/tenor.gif?itemid=7394758",
               "https://media1.tenor.com/images/70960e87fb9454df6a1d15c96c9ad955/tenor.gif?itemid=10092582",
               "https://media1.tenor.com/images/005e8df693c0f59e442b0bf95c22d0f5/tenor.gif?itemid=10947495",
               "https://media1.tenor.com/images/a6392ee39e9a419b33fa44eb5af7cade/tenor.gif?itemid=10309748",
               "https://media1.tenor.com/images/d12d447301a5e93c9d1c42fa55fd020b/tenor.gif?itemid=12018807",
               "https://media1.tenor.com/images/220babfd5f8b629cc16399497ed9dd96/tenor.gif?itemid=6130861",
               "https://78.media.tumblr.com/b7a848f26f8bb1eb91165e24de83fe25/tumblr_ofcc5nEqxo1tydz8to4_540.gif"];
    var choice = Math.floor(Math.random() * urls.length);
    var sender = msg.author.id;
    var receiver = list.firstKey(1);
    console.log(sender, receiver);
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setImage(urls[choice]).setDescription(`🐱 <@${sender}> has given <@${receiver}> a pat!\n(^・ω・^ )`)).catch(err => {console.error(err)});
  }
}