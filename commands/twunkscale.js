module.exports = { name: "twunkscale", run(client, msg, args) {
  if (args.length > 1) {
    msg.channel.send({embed: {
      color: client.color,
      description: "Too many names were given!"
    }}).then(msg => {msg.delete(2000)});
  }
  else {
    var name;
    if (msg.isMemberMentioned(msg.author.id) || args.length < 1) {
      name = msg.author.username;
    }
    else {
      name = args[0];
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
        result = "twinkest";
        break;
      case 2:
        result = "twink";
        break;
      case 3:
        result = "twunk";
        break;
      case 4:
        result = "hunk";
        break;
      case 5:
        result = "otter";
        break;
      case 6:
        result = "cub";
        break;
      case 0:
        result = "bear";
        break;
    }
    msg.channel.send({embed: {
      color: client.color,
      description: `**${name}**, you are a **${result}**!`
    }});
  }
},}
