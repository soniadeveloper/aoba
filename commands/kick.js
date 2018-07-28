exports.run = (client, msg, args) => {
  console.log(args);
  var joined = args.join(" ");
  var arg = joined.split('"');
  console.log(`Arguments: ${arg}`);
  var name = arg[0];
  console.log(`Name given: ${name}`);
  var reason = arg[1];
  console.log(`Reason given: ${reason}`);
  var canKick = msg.member.hasPermission("KICK_MEMBERS");
  if (canKick == false) {
    msg.channel.send({embed: {
        color: client.color,
        description: "**ERROR**: You don't have permission to kick members!"
    }}).then(msg => {msg.delete(5000)});
  }
  else {
    if (args.length < 1 || msg.mentions.members == null) {
      msg.channel.send({embed: {
          color: client.color,
          description: "**ERROR**: Please give a member to kick!"
      }}).then(msg => {msg.delete(5000)});
    }
    else {
      var member = msg.mentions.members.first();
      var name = member.user.username;
      if(msg.guild.me.hasPermission("KICK_MEMBERS") && member.kickable) {
        if (reason !== undefined) {
          member.kick(reason);
          msg.channel.send({embed: {
              color: client.color,
              description:  `**${name}** has been kicked! 👋\n**Reason:** ${reason}`
          }});
        }
        else  {
          member.kick();
          msg.channel.send({embed: {
              color: client.color,
              description:  `**${name}** has been kicked! 👋`
          }});
        }
      }
    else {
        msg.channel.send({embed: {
            color: client.color,
            description: "**ERROR**: This bot doesn't have permission to kick this member. Please grant higher permissions to the **Aoba** role."
        }}).then(msg => {msg.delete(5000)});
    }
  }
}
}