exports.run = (client, msg, args) => {
  var guild = msg.guild;
  if (!guild.available) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ The guild is not available right now")).catch(console.error);
  }
  else {
    if (args.length == 0) {
      function notBots(guild) {
        var count = 0;
        var members = guild.members;
        for (var i = 0; i < members.array().length; i++) {
          if (!members.array()[i].user.bot) {
            count++;
          }
        }
        return count;
      }
      var embed = new client.discord.RichEmbed()
      .setColor(client.color)
      .setTitle(`${guild.name} Info`)
      .setThumbnail(guild.iconURL)
      .addField("Aoba Prefix", client.prefixes.get(guild.id))
      .addField("ID", guild.id)
      .addField("Owner", guild.owner.user.tag)
      .addField("Date created", guild.createdAt, true)
      .addField("# of members", notBots(guild), true)
      .addField("# of Roles", `${guild.roles.array().length} (view roles using \`${client.prefixes.get(guild.id)}server roles\`)`, true)
      .addField("# of Channels", guild.channels.array().length, true)
      .addField("Region", guild.region, true);
      msg.channel.send(embed).catch(err => {console.error(err)});
    }
    else {
      switch (args[0]) {
        case "roles":
          if (args[1] === undefined) {
            var roles = guild.roles.array();
            function listRoles(arr) {
              var msg = ""
              for (var i = 0; i < roles.length; i++) {
                msg += `‣${roles[i]}\n`
              }
              return msg;
            }
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setTitle(`${guild.name} Roles`).
                             setDescription(`${listRoles(roles)}\nTo view a specific role use \`${client.prefixes.get(guild.id)}server roles [role name]\``)).catch(err => {console.error(err)});
          }
          else {
            args.shift()
            var name = args.join(" ");
            if (guild.roles.find("name", name) === null) {
               msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Role could not be found!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
            }
            else {
              var role = guild.roles.find("name", name);
              function listMembers(role) {
                var arr = role.members.array();
                var list = ""
                for (var i = 0; i < arr.length; i++) {
                  list += `‣ ${arr[i].displayName}\n`;
                }
                if (list === "") {
                  return "None";
                }
                else {
                  return list;
                }
              }
              var embed = 
              new client.discord.RichEmbed().setColor(role.color).setTitle(`\`${role.name}\``)
              .addField("ID", role.id, true)
              .addField("Created at", role.createdAt, true)
              .addField("Mentionable?", role.mentionable, true)
              .addField("Hoisted?", role.hoist, true)
              .addField("Permissions", role.permissions, true)
              .addField("Members", listMembers(role));
          
              msg.channel.send(embed);
            }
          }
          break;
        case "name":
          if (args[1] === undefined) {
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`The server name is currently **${guild.name}**. Please use \`${client.prefixes.get(guild.id)}server name [name]\` to change the name of the server`)).catch(err => {console.error(err)});
          }
          else {
            args.shift();
            var name = args.join(" ");
            if (!msg.member.hasPermission("MANAGE_GUILD")) {
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ You don't have permission to use this command!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
            }
            else if (!guild.me.hasPermission("MANAGE_GUILD")) {
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Aoba doesn't have permission to use this command. Please grant the Aoba role the **Manage server** permission.")).then(msg => {msg.delete(4000)}).catch(err => {console.error(err)});
            }
            else {
              guild.setName(name).then(g => {
                msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Name has been changed to ${name}`));
              }).catch(error => {
                console.error(error);
                msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️There was an error changing the name of the server.")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
              })
            }
          }
          break;
        case "icon":
          if (args[1] === undefined) {
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("Current server icon:").setImage(guild.iconURL));
          }
          else if (!msg.member.hasPermission("MANAGE_GUILD")) {
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ You don't have permission to use this command!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
          }
          else if (!guild.me.hasPermission("MANAGE_GUILD")) {
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Aoba doesn't have permission to use this command. Please grant the Aoba role the **Manage server** permission.")).then(msg => {msg.delete(4000)}).catch(err => {console.error(err)});
          }
          else {
            guild.setIcon(args[1]).then(() => {
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Icon has been changed`));
            }).catch(error => {
              console.error(error);
                msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️There was an error changing the icon of the server.")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
            });
          }
          break;
        default:
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Too many arguments!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
          break;
      }
    }
  }
}