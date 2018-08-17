module.exports = { name: "teentropes", run(client, msg, args) {
  var alignments = ["prep", "goth", "jock", "nerd", "nerdy goth", "preppy nerd", "preppy jock", "goth jock"];
  var id = parseInt(msg.author.id) + 2;
  var choice = id % alignments.length;
  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`🤓 ${msg.member.displayName}, you are a **${alignments[choice]}**!`));
},}