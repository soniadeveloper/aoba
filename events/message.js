module.exports = (client, msg) => {
  let lastCommand;
  var def = msg.channel;
  if (msg.author.bot) return; //ignore bot's messages
  //ignore messages not starting with prefix
  
  let prefix;
  
  if (msg.guild !== null && client.prefixes.get(msg.guild.id) === null) {
    client.prefixes.set(msg.guild.id, process.env.PREFIX);
  }
  
  if (msg.guild === null) {
    return prefix = process.env.PREFIX;
  }
  prefix = (client.prefixes.get(msg.guild.id) !== null) ? client.prefixes.get(msg.guild.id) : process.env.PREFIX;
  
  if (msg.content.indexOf(prefix) !== 0) {
    if (msg.mentions.members.first() === msg.guild.me) {
      const args = msg.content.slice(`<@${msg.mentions.members.firstKey()}> `.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      const cmd = client.commands.get(command);
      if (!cmd || cmd === null) return;
      var channel = msg.channel;
      var time = Date.now();
      if (client.cd.has(msg.author.id)) {
        var wait = client.cd.get(msg.author.id);
        if (time < wait) {
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`Please wait **${Math.round((wait - time)/1000)}** seconds before using another command!`)).then(msg => {msg.delete(2000).then(()=>{console.log("deleted")}).catch(error=> {console.error(error)})});
        }
        else {
          client.cd.set(msg.author.id, Date.now() + (client.sec * 1000));
          cmd.run(client, msg, args);
        }
      }
      else {
        client.cd.set(msg.author.id, Date.now() + (client.sec * 1000));
        cmd.run(client, msg, args);
      }
    }  
    else {
    client.sql.get(`SELECT * FROM blacklist WHERE guildId = "${msg.guild.id}"`).then(row => {
      if (!row) return;
      var lwc = msg.content.toLowerCase();
      var msgWords = lwc.split(" ");
      var wordsArray = row.words.split(" ");
      for (var i = 0; i < msgWords.length; i++) {
        for (var j = 0; j < wordsArray.length; j++) {
          if (msgWords[i] === wordsArray[j].toLowerCase()) {
            msg.channel.send({embed: {
                color: client.color,
                description: `‼️ **Blacklisted word detected:** \`${wordsArray[j]}\``
            }});
          }
        }
      }
    });
    client.sql.get(`SELECT * FROM fsd WHERE userId = '${msg.author.id}'`).then(row => {
      if (!row) return;
      var chanceItem = Math.floor(Math.random() * 100);
      client.sql.run(`UPDATE fsd SET points = ${row.points + 1} WHERE userId = ${msg.author.id}`);
      if (row.points == Math.pow(2, row.level)) {
        client.sql.run(`UPDATE fsd SET level = ${row.level + 1}, att = ${row.att + Math.ceil(row.level / 2)}, def = ${row.def + Math.ceil(row.level / 2)}, mag = ${row.mag + Math.ceil(row.level / 2)}, spd = ${row.spd + Math.ceil(row.level / 2)} WHERE userId = ${msg.author.id}`);
        client.sql.get(`SELECT * FROM fschannels WHERE guildId = '${msg.guild.id}'`).then(r => {
          if (!r) {
            console.log("row doesn't exist");
            client.sql.run("INSERT INTO fschannels (guildId, channel) VALUES (?, ?)", [msg.guild.id, "any"]);
            msg.channel.send({embed: {
                color: client.color,
                description: `✨⤴️ ${msg.author.username} leveled up to **Lv.${row.level+1}**!`
            }});
          }
          else {
            if (r.channel === "any" || r.channel === "any channel") {
              console.log("channel is any");
              msg.channel.send({embed: {
                  color: client.color,
                  description: `✨⤴️ ${msg.author.username} leveled up to **Lv.${row.level+1}**!`
              }});
            }
            else {
              console.log("channel is custom");
              var channel = msg.guild.channels.get(r.channel);
                channel.send({embed: {
                  color: client.color,
                  description: `✨⤴️ ${msg.author.username} leveled up to **Lv.${row.level+1}**!`
                }});
            }
          }
        }).catch(() => {
          console.log("error occured");
          client.sql.run("CREATE TABLE IF NOT EXISTS fschannels (guildId TEXT, channel TEXT)").then(() => {
            console.log("table created");
            client.sql.run("INSERT INTO fschannels (guildId, channel) VALUES (?, ?)", [msg.guild.id, "any"]);
            console.log("inserted row");
            msg.channel.send({embed: {
                  color: client.color,
                  description: `✨⤴️ ${msg.author.username} leveled up to **Lv.${row.level+1}**!`
            }});
            });
        });
      }
      else if (chanceItem == 8) {
        var items = client.items;
        var pickable = [items[0], items[21], items[6], items[18], items[7], items[11], items[20], items[14], items[3], items[19], items[12], items[5]];
        var rand = Math.floor(Math.random() * pickable.length);
        var acquired = pickable[rand];
        if (row.items === "None") {
          client.sql.run(`UPDATE fsd SET items = '${acquired}' WHERE userId = ${msg.author.id}`);
        }
        else {
          client.sql.run(`UPDATE fsd SET items = '${row.items + "," + acquired}' WHERE userId = ${msg.author.id}`);
        }
        client.sql.get(`SELECT * FROM fschannels WHERE guildId = '${msg.guild.id}'`).then(r => {
          if (!r) {
            console.log("row doesn't exist");
            client.sql.run("INSERT INTO fschannels (guildId, channel) VALUES (?, ?)", [msg.guild.id, "any"]);
            msg.channel.send({embed: {
                color: client.color,
                description: `🎁 ${msg.author.username}, you picked up the **${acquired}**!`
            }});
          }
          else {
            console.log("channel is any");
            if (r.channel === "any channel" || r.channel === "any") {
              msg.channel.send({embed: {
                  color: client.color,
                  description: `🎁 ${msg.author.username}, you picked up the **${acquired}**!`
              }});
            }
            else {
              console.log("channel is custom");
              var channel = msg.guild.channels.get(r.channel);
                channel.send({embed: {
                    color: client.color,
                    description: `🎁 ${msg.author.username}, you picked up the **${acquired}**!`
                }});
            }
          }
        }).catch(error => {
          console.log("error occured");
          client.sql.run("CREATE TABLE IF NOT EXISTS fschannels (guildId TEXT, channel TEXT)").then(() => {
            console.log("table created");
            client.sql.run("INSERT INTO fschannels (guildId, channel) VALUES (?, ?)", [msg.guild.id, "any"]);
            console.log("insert row");
            msg.channel.send({embed: {
                  color: client.color,
                  description: `🎁 ${msg.author.username}, you picked up the **${acquired}**!`
            }});
            });
        });
      }
      else return;
    });
  }
}
  else {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd || cmd === null) return;
    else {
      var time = Date.now();
      if (client.cd.has(msg.author.id)) {
        var wait = client.cd.get(msg.author.id);
        if (time < wait) {
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`Please wait **${Math.ceil((wait - time)/1000)}** seconds before using another command!`)).then(msg => {msg.delete(2000).then(()=>{console.log("deleted")}).catch(error=> {console.error(error)})});
        }
        else {
          client.cd.set(msg.author.id, Date.now() + (client.sec * 1000));
          try {
            cmd.run(client, msg, args);
          }
          catch (err) {
            console.error(err);
          }
        }
      }
      else {
        client.cd.set(msg.author.id, Date.now() + (client.sec * 1000));
        try {
          cmd.run(client, msg, args);
        }
        catch (err) {
          console.error(err);
        }
      }
    }
  }
}