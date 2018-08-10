module.exports = { name: "who", run(client, msg, args) {
  var key = msg.guild.members.randomKey();
  while(msg.guild.members.get(key).user.bot) {
    key = msg.guild.members.randomKey();
  }
    var member = msg.guild.members.get(key);
    msg.channel.send({embed: {
      color: client.color,
      description: `⁉️\nThe answer is **${member.displayName}**.`
    }});
},}
