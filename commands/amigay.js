exports.run = (client, msg, args) => {
  var name = msg.author.username;
  var val = 0;
  for (var i = 0; i < name.length; i++) {
    val += name.charCodeAt(i);
  }
  var chance = val % 2;
  if (chance == 0) {
    msg.channel.send({embed: {
        color: client.color,
        description: `Yes, ${name} is gay.`
    }});
  }
  else {
    msg.channel.send({embed: {
        color: client.color,
        description: `No, ${name} is a hettie.`
    }});
  }
}
