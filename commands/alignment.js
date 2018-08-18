module.exports = { name:"alignment", run(client, msg, args){
  var alignments = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"]; //options
  var id = parseInt(msg.author.id); //parse id into an int
  var choice = id % alignments.length; //choose a random alignment based on the persons id
  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`📜 ${msg.member.displayName}, you are **${alignments[choice]}**!`)); //send message
},}