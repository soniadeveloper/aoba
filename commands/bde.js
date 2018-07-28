exports.run = (client, msg, args) => {
  if (args.length < 1) {
    var name = msg.author.username;
  }
  else if (args.length == 1) {
    var name = args[0];
  }
  else return;
  var val = 0;
  for (var i = 0; i < name.length; i++) {
    val += name.charCodeAt(i);
  }
  var pct;
  if(val <= 100) {
    pct = val / 100;
  }
  else {
    pct = 100 / val;
  }
  var percent = Math.round(pct * 100);
  msg.channel.send({embed: {
      color: client.color,
      description: `**${name}'s** BDE is **${percent}**%!`
  }});
}
