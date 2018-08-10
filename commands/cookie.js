module.exports = { name: "cookie", run(client, msg, args) {
  var list = msg.mentions.members;
  if (list.first() === undefined) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ Please list a user to give a cookie to!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    var sender = msg.author.id;
    var receiver = list.firstKey(1);
    msg.channel.send({embed: {
            color: client.color,
            description: `🍪 <@${sender}> has given <@${receiver}> a cookie!\n(｡♡‿♡｡)`
    }});
  }
},}