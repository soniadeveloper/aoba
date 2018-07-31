exports.run = (client, msg, args) => {
  var list = msg.mentions.members;
  if (list.first() === null || list.first() === undefined) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ Please list a user to lick!"
    }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
  }
  if (list.first().user.bot) return;
  else if (list.firstKey() === msg.author.id) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ You can't lick yourself!"
    }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
  }
  else {
    var sender = msg.author.id;
    var receiver = list.firstKey(1);
    var urls = ["https://i.kym-cdn.com/photos/images/original/001/230/497/04d.gif",
               "https://pa1.narvii.com/6415/99af997dbefc5885ebe12e497c5a4cfdc4b03843_hq.gif",
               "https://media3.giphy.com/media/P946Ltkj3opW/giphy.gif",
               "https://media1.tenor.com/images/1925e468ff1ac9efc2100a3d092c54ff/tenor.gif?itemid=4718221"];
    var choice = Math.floor(Math.random() * urls.length);
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setImage(urls[choice]).setDescription(`👅 <@${sender}> has licked <@${receiver}>!\n(˘ڡ˘)`));
  }
}