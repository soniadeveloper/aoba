exports.run = (client, msg, args) => {
  if (!msg.guild.members.get(msg.author.id).hasPermission("MANAGE_ROLES")) {
    //if member doesn't have permission
    msg.channel.send({embed: {
      color: client.color,
      description: "❗️ You don't have permission to use this command!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    //if member does have permission
      var role = args.slice(0).join(" ");
      var roleToGet = msg.guild.roles.find(r => r.name === role);
      var canRole = msg.guild.me.hasPermission("MANAGE_ROLES");
      if (canRole) {
        client.sql.get(`SELECT * FROM auto WHERE guildId = '${msg.guild.id}'`).then(row => {
          if (!row) { // if guild has never used this command before
            if (args.length == 0 || role === undefined) {
              msg.channel.send({embed: {
                color: client.color,
                description: `❗️This server doesn't have autorole set!`
              }});
            }
            else if (roleToGet === undefined) {
              msg.channel.send({embed: {
                color: client.color,
                description: "❗️ This role doesn't exist"
              }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
            }
            else {
              client.sql.run("INSERT INTO auto (guildId, role, onoroff) VALUES (?, ?, ?)", [msg.guild.id, role, 1]);
              msg.channel.send({embed: {
                color: client.color,
                description: `Autorole has been set to **${role}**!`
              }});
            }
          }
          else{
            if (args.length == 0 || role === undefined) {
              var status;
              if (row.onoroff == 1) {
                status = "ON";
              }
              else {
                status = "OFF";
              }
              msg.channel.send({embed: {
                color: client.color,
                description: `Autorole is currently **${row.role}** and is **${status}**.\n Use \`>autorole [role name]\` to change the autorole or \`>autorole ON or OFF\` to turn autorole on or off.`
              }});
            }
            else if (role === "OFF") {
              //turns off autorole
              client.sql.run(`UPDATE auto SET onoroff = 0 WHERE guildId = ${msg.guild.id}`);
              msg.channel.send({embed: {
                color: client.color,
                description: `✅ Autorole has been turned **${role}**!`
              }});
            }
            else if (role === "ON") {
              client.sql.run( `UPDATE auto SET onoroff = 1 WHERE guildId = ${msg.guild.id}`);
              msg.channel.send({embed: {
                color: client.color,
                description: `✅ Autorole has been turned **${role}**!`
              }});
            }
            else if (roleToGet === undefined) {
              msg.channel.send({embed: {
                color: client.color,
                description: "❗️ This role doesn't exist"
              }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
            }
            else {
              client.sql.run(`UPDATE auto SET role = '${role}' WHERE guildId = ${msg.guild.id}`);
              msg.channel.send({embed: {
                color: client.color,
                description: `✅ Autorole has been set to **${role}**!`
              }});
            }
          }
        }).catch(() => {
          console.error;
          client.sql.run("CREATE TABLE IF NOT EXISTS auto (guildId TEXT, role TEXT, onoroff INTEGER)").then(() => {
            client.sql.run("INSERT INTO auto (guildId, role, onoroff) VALUES (?, ?, ?)", [msg.guild.id, role, 1]);
            msg.channel.send({embed: {
              color: client.color,
              description: `✅ Autorole has been set to **${role}**!`
            }});
          })
        });
      }
      else { // if aoba doesn't have permission
        msg.channel.send({embed: {
          color: client.color,
          description: "❗️ Aoba doesn't have permission to manage roles! Please grant the **Aoba** role the **Manage roles** permission."
        }}).then(msg => {msg.delete(3000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      }
  }
}
