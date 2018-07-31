exports.run = (client, msg, args) => {
  var list = msg.mentions.members;
  //console.log(list);
  if (list.first() === undefined) {
    msg.channel.send({embed: {
            color: client.color,
            description: "Please list a user to give a cookie to!"
    }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
  }
  else {
    var sender = msg.author.id;
    var receiver = list.firstKey(1);
    console.log(sender, receiver);
    msg.channel.send({embed: {
            color: client.color,
            description: `🍪 <@${sender}> has given <@${receiver}> a cookie!\n(｡♡‿♡｡)`
    }});
  }
}