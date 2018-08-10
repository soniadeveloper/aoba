module.exports = { name: "birthday", run(client, msg, args) {
  var list = msg.mentions.members;
  if (list.first() === null || list.first() === undefined) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ Please list a user to wish a happy birthday to!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else if (list.first().user.bot) {
    return;
  }
  else if (list.firstKey() === msg.author.id) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ You can't wish yourself a happy birthday!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    var sender = msg.author.id;
    var receiver = list.firstKey(1);
    var urls = ["https://media1.tenor.com/images/ec87fce45e420dede122cb7a5fe240c7/tenor.gif?itemid=8320734",
               "https://media1.tenor.com/images/30eb46c332530a9fa780309b2cf06e94/tenor.gif?itemid=9188391",
               "https://media1.tenor.com/images/4edc2a068950de1b0b5cbbba7389ac79/tenor.gif?itemid=12005599",
               "https://media1.tenor.com/images/ee72c83e7ed41b639d1c47913a419f81/tenor.gif?itemid=4183460"];
    var choice = Math.floor(Math.random() * urls.length);
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setImage(urls[choice]).setDescription(`🎉🎂 <@${sender}> has wished <@${receiver}> a happy birthday!\n°˖✧◝(⁰▿⁰)◜✧˖°`));
  }
},}