exports.run = (client, msg, args) => {
  var list = msg.mentions.members;
  if (list.first() === null || list.first() === undefined) {
    msg.channel.send({embed: {
            color: client.color,
            description: "Please list a user to hug!"
    }}).then(msg => {msg.delete(2000)});
  }
  else {
    var sender = msg.author.id;
    var receiver = list.firstKey(1);
    console.log(sender, receiver);
    msg.channel.send({embed: {
            color: client.color,
            description: `💗 <@${sender}> has given <@${receiver}> a hug!\n( ˉ̞̭(′͈∨‵͈♡)˄̻ ̊`
    }});
  }
}