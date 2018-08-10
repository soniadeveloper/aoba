module.exports = { name: "futchscale", run(client, msg, args) {
  if (args.length > 1) {
    msg.channel.send({embed: {
      color: client.color,
      description: "Too many names were given!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    var name;
    if (msg.isMemberMentioned(msg.author.id) || args.length < 1) {
      name = msg.author.username;
    }
    else {
      var name = args[0];
    }
    var val = 0;
    for (var i = 0; i < name.length; i++) {
    val += name.charCodeAt(i);
    }
    var num = val % 100;
    var c = num % 7;
    var result;
    switch (c) {
      case 1:
        result = "futch";
        break;
      case 2:
        result = "butch";
        break;
      case 3:
        result = "high femme";
        break;
      case 4:
        result = "butchy femme";
        break;
      case 5:
        result = "femme";
        break;
      case 6:
        result = "stone butch";
        break;
      case 0:
        result = "soft butch";
        break;
    }
    msg.channel.send({embed: {
      color: client.color,
      description: `**${name}**, you are a **${result}**!`
    }});
  }
},}
