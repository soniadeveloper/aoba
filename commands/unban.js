exports.run = (client, msg, args) => {
  var joined = args.join(" ");
  var arg = (joined.includes("\"")) ? joined.split("\"") : joined.split("“");
  var name = arg[0];
  var reason = ((arg[1] !== undefined) && arg[1].includes("”")) ? arg[1].slice(0, arg[1].length - 1) : arg[1];
  var canBan = msg.member.hasPermission("BAN_MEMBERS");
  if (canBan == false) {
       msg.reply({embed: {
         color: client.color,
        description: "**ERROR**: You don't have permission to unban members!"
      }}).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
  }
  else {
    //if bot can ban members
    if(msg.guild.me.hasPermission("BAN_MEMBERS")) {
      msg.guild.fetchBans().then(bans => { 
      var user;
      if (name.substring(0,2) === "<@") {
        var id = name.substring(2, name.length-2);
        user = bans.get(id);
      }
      else {
        var listUsers = bans.findAll("username", name);
        user = listUsers[0];
      }
      if (user !== undefined && user !== null) { //if member is found
          msg.guild.unban(user.id).then(usr => {
            var message;
            if (reason !== undefined) {
              message = `✅ **${usr.username}** has been unbanned from ${msg.guild.name}!\n**Reason:** ${reason}`
            }
            else {
              message = `✅ **${usr.username}** has been unbanned from ${msg.guild.name}!`
            }
            msg.channel.send({embed: {
              color: client.color,
              description: message
            }}).then(msg => {msg.delete(5000000)}).catch(err => {console.error(err)});
          })
            .catch(() => {
            console.error;
            msg.channel.send({embed: {
              color: client.color,
              description: "❗️User could not be unbanned!"
            }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
          });
      }
      else {
        msg.channel.send({embed: {
          color: client.color,
          description: "❗️Member could not be found in the ban list!"
        }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
      }
      }).catch(() => {
        msg.channel.send({embed: {
          color: client.color,
          description: "❗️Could not fetch list of banned members!"
        }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
      });
    }
    //if bot cannot ban members
    else {
      msg.channel.send({embed: {
        color: client.color,
        description: "**ERROR:** This bot doesn't have permission to unban members. Please grant the **Ban members** permission to the **Aoba** role."
      }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
    }
  }
}