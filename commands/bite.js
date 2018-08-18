module.exports = { name: "bite", run(client, msg, args) {
  //action command
  var list = msg.mentions.members;
  if (list.first() === null || list.first() === undefined) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ Please list a user to bite!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else if (list.first().user.bot) {
    return;
  }
  else if (list.firstKey() === msg.author.id) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ You can't bite yourself!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    var sender = msg.author.id;
    var receiver = list.firstKey(1);
    var urls = ["https://media1.tenor.com/images/c22a247affcf4cd02c7d17f5a432cd95/tenor.gif?itemid=8259627",
               "https://media1.tenor.com/images/432a41a6beb3c05953c769686e8c4ce9/tenor.gif?itemid=4704665",
               "https://media1.tenor.com/images/cb5b6f8b267be7f9f0e1dd4ac52e6439/tenor.gif?itemid=4696679",
               "https://media1.tenor.com/images/83271613ed73fd70f6c513995d7d6cfa/tenor.gif?itemid=4915753"];
    var choice = Math.floor(Math.random() * urls.length);
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setImage(urls[choice]).setDescription(`😼 <@${sender}> has bitten <@${receiver}>!\n(*Φ皿Φ*)`));
  }
},}