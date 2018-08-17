module.exports = { name:"alignment", run(client, msg, args){
  var alignments = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"];
  var id = parseInt(msg.author.id);
  var choice = id % alignments.length;
  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`📜 ${msg.member.displayName}, you are **${alignments[choice]}**!`));
},}