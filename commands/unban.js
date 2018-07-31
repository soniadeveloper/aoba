exports.run = (client, msg, args) => {
  console.log(`Arguments: ${args}`);
  var joined = args.join(" ");
  var arg = joined.split('"');
  console.log(`Arguments: ${arg}`);
  var name = arg[0];
  console.log(`Name given: ${name}`);
  var reason = arg[1];
  console.log(`Reason given: ${reason}`);
  var canBan = msg.member.hasPermission("BAN_MEMBERS");
  if (canBan == false) {
    //console.log("can't ban");
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
        //console.log("mention is used");
        var id = name.substring(2, name.length-2);
        console.log(`user ID: ${name.substring(2, name.length-1)}`);
        user = bans.get(id);
        console.log(`User: ${user}`);
      }
      else {
        //console.log("mention is not used");
        var listUsers = bans.findAll("username", name);
        console.log(listUsers);
        user = listUsers[0];
        console.log(`User: ${user}`);
      }
      console.log(user !== undefined, user !== null);
      if (user !== undefined && user !== null) { //if member is found
        //console.log("member is found");
        //console.log(`ID = ${user.id}`);
          msg.guild.unban(user.id).then(usr => {
            //console.log("unbanning user");
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
        //console.log("member can't be found");
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