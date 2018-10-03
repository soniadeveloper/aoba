module.exports = { name: "position", run(client, msg, args) {
  if (!msg.channel.nsfw) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("🔞 This command can only be used in channels marked as **NSFW**!")).then(msg => {msg.delete(5000)});
  }
  else {
  var options = ["top", "bottom", "verse", "service top", "power bottom", "dominant top", "submissive bottom", "bottom-passing top", "bottom-passing verse", "bottom of bottoms", "top-passing bottom", "top-passing verse", "top topper"];
  var len = options.length;
  var val = 0;
  var name = msg.author.username;
  for (var i = 0; i < name.length; i++) {
    val += name.charCodeAt(i);
  }
  var chance = val % len;
  var res = options[chance];
  msg.channel.send({embed: {
          color: client.color,
          description: `${name}, you are a **${res}**!`
      }});
  }
},}