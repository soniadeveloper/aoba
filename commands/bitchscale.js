module.exports = { name:"bitchscale", run(client, msg, args){
  var alignments = ["dumbass thot", "edgy bitch", "depressed bastard", "dumbass bastard", "depressed thot", "edgy thot", "edgy bastard", "dumbass bitch", "depressed bitch"];
  var id = parseInt(msg.author.id) + 5;
  var choice = id % alignments.length;
  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`😂 ${msg.member.displayName}, you are a **${alignments[choice]}**!`));
},}