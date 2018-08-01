exports.run = (client, msg, args) => {
  if (args.length === 0) {
    return msg.channel.send({embed: {
          color: 0xffa3e7,
          description: "❗️Missing arguments!"
      }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
  }
  var joined = args.join(" ");
  var arg = (joined.includes("\"")) ? joined.split("\"") : joined.split("“");
  var name = arg[0];
  var reason = ((arg[1] !== undefined) && arg[1].includes("”")) ? arg[1].slice(0, arg[1].length - 1) : arg[1];
  var canKick = msg.member.hasPermission("KICK_MEMBERS");
  if (canKick == false) {
    msg.channel.send({embed: {
        color: client.color,
        description: "**ERROR**: You don't have permission to kick members!"
    }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
  }
  else {
    if (args.length < 1 || msg.mentions.members == null) {
      msg.channel.send({embed: {
          color: client.color,
          description: "**ERROR**: Please give a member to kick!"
      }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
    }
    else {
      var member = msg.mentions.members.first();
      var name = member.user.username;
      if(msg.guild.me.hasPermission("KICK_MEMBERS") && member.kickable) {
        if (reason !== undefined) {
          member.kick(reason).then(() => {
          msg.channel.send({embed: {
              color: client.color,
              description:  `**${name}** has been kicked! 👋\n**Reason:** ${reason}`
          }})}).catch(console.error);
        }
        else  {
          member.kick().then(() => {
          msg.channel.send({embed: {
              color: client.color,
              description:  `**${name}** has been kicked! 👋`
          }})}).catch(console.error);
        }
      }
    else {
        msg.channel.send({embed: {
            color: client.color,
            description: "**ERROR**: This bot doesn't have permission to kick this member. Please grant higher permissions to the **Aoba** role."
        }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
    }
  }
}
}