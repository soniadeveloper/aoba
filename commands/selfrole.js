exports.run = (client, msg, args) => {
  var canRole = msg.guild.me.hasPermission("MANAGE_ROLES");
  var canUserRole = msg.member.hasPermission("MANAGE_ROLES");
  var serverRoles = msg.guild.roles.array();
  client.sql.get(`SELECT * FROM selfrole WHERE guildID = '${msg.guild.id}'`).then(row => {
    if (args.length == 0) {
      //if no other argument has been given
      if (!row) {
        //if the row could not be found
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color)
                         .setTitle(`➡️ ${msg.guild.name}'s Self-Assignable Roles`)
                         .setDescription("This server doesn't have any self-assignable roles available!"));
      }
      else {
        //if the guild has used this command before
        console.log(row.roles);
        var selfroles = row.roles.split(",");
        console.log(selfroles);
        var list = "";
        var guildroles = msg.guild.roles;
        for (var i = 0; i < selfroles.length; i++) {
          if (guildroles.exists("name", selfroles[i])) {
            list += `‣ ${guildroles.find("name", selfroles[i])}\n`;
          }
          if (list === "") {
            list = "This server doesn't have any self-assignable roles available!";
          }
          else {
            list;
          }
        }
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color)
                         .setTitle(`➡️ ${msg.guild.name}'s Self-Assignable Roles`).
                         setDescription(list));
      }
    }
    else {
      //if an argument has been given
      if (args[0] === "add") {
        //if the user wants to add a role
        console.log("adding role...");
        if (!canUserRole) {
          //if the user doesn't have permission
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ You don't have permission to add a self-role!"))
          .then(msg => {msg.delete(2000)});
        }
        else {
          //if the user does have permission
          if (args.length < 2) {
            //if a role was not given
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ Please give a role! Use `>selfrole add [role name]`."))
            .then(msg=>{msg.delete(4000)});
          }
          else {
            //if a role was given
            var index
            args.shift();
            var role = args.join(" ");
            for (var i = 0; i < serverRoles.length; i++) {
              if (role === serverRoles[i].name) {
                index = i;
              }
            }
            console.log(index);
            if (!index) {
              //if the role can't be found in the server
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Could not find the given role!"))
              .then(msg => {msg.delete(2000)});
            }
            else {
              if (!row) {
                // if the server does not already have any self roles
                client.sql.run("INSERT INTO selfrole (guildID, roles) VALUES (?, ?)", [msg.guild.id, role]).then(() => {
                  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Self-assignable role added: ${serverRoles[index]}`));
                });
              }
              else {
                //if the server does have self roles
                var exists = 0;
                var selfroles = row.roles.split("`");
                for (var i = 0; i < selfroles.length; i++) {
                  if (role === selfroles[i]) {
                    exists += 1;
                  }
                }
                console.log(exists);
                if (exists > 0) {
                  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Role already exists in list of self-assignable roles!"))
                  .then(msg => {msg.delete(2000)});
                }
                else {
                  if (row.roles === "") {
                    client.sql.run(`UPDATE selfrole SET roles = '${role}' WHERE guildID = ${msg.guild.id}`).then(() => {
                      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Self-assignable role added: ${serverRoles[index]}`));
                    });
                  }
                  else {
                    client.sql.run(`UPDATE selfrole SET roles = '${row.roles + "`" + role}' WHERE guildID = ${msg.guild.id}`).then(() => {
                      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Self-assignable role added: ${serverRoles[index]}`));
                    });
                  }
                }
              }
            }
          }
        }
      }
      else if (args[0] === "delete") {
        if (args.length < 2) {
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Must give a role to delete!"))
              .then(msg => {msg.delete(2000)});
        }
        else {
          var selfroles = row.roles.split("`");
          console.log(selfroles);
          args.shift()
          var role = args.join(" ");
          console.log(role);
          var index;
          for (var i = 0; i < selfroles.length; i++) {
            if (role === selfroles[i]) {
              index = i;
            }
          }
          console.log(index);
          if (!(index === undefined)) {
            selfroles.splice(index, 1);
            var newRoles = selfroles;
            console.log(newRoles);
            client.sql.run(`UPDATE selfrole SET roles = '${newRoles}' WHERE guildID = ${msg.guild.id}`).then(() => {
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Role has been removed from list of self-assignable roles.`));
            });
          }
          else {
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Could not find the given role!"))
                .then(msg => {msg.delete(2000)});
          }
        }
      }
      else {
        if (canRole) {
          //if aoba has permission
          var selfroles = row.roles.split("`");
          console.log(selfroles);
          var role = args.join(" ");
          var index;
          for (var i = 0; i < selfroles.length; i++) {
            if (role === selfroles[i]) {
              index = i;
            }
          }
          console.log(index);
          if (!(index === undefined)) {
            //if the role is in the list of self-assignable roles
            var wanted = selfroles[index];
            var get = msg.guild.roles.find("name", wanted);
            if (msg.member.roles.exists("name", get.name)) {
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️You already have this role!"))
                .then(msg => {msg.delete(2000)});
            }
            else {
              msg.member.addRole(get).then(() => {
                msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Role has been added."));
              }).catch(error => {
                console.error(error);
                msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️There was an error adding the role!"))
                .then(msg => {msg.delete(2000)});
              });
            }
          }
          else {
            //if the role could not be found in the list
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Could not find the given role!"))
              .then(msg => {msg.delete(2000)});
          }
        }
        else {
          //if aoba does not have permission
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Aoba does not have permission to assign you a role! Please grant the Aoba role the **Manage roles** permission!"))
              .then(msg => {msg.delete(4000)});
        }
      }
    }
  }).catch(error => {
    console.error(error);
    client.sql.run("CREATE TABLE IF NOT EXISTS selfrole (guildID TEXT UNIQUE, roles TEXT)");
  })
}