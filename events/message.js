module.exports = (client, msg) => {
  let lastCommand;
  if (msg.author.bot) return; //ignore bot's messages
  //ignore messages not starting with prefix
  if (client.prefixes.get(msg.guild.id) === undefined) {
    client.prefixes.set(msg.guild.id, process.env.PREFIX);
  }
  
  let prefix = client.prefixes.get(msg.guild.id);
  
  if (msg.content.indexOf(prefix) !== 0) {
    if (msg.mentions.members.first() === msg.guild.me) {
      var cooldown = false;
    const now = Date.now();
      console.log(msg.mentions.members.first());
      const args = msg.content.slice(`<@${msg.mentions.members.firstKey()}> `.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      const cmd = client.commands.get(command);
      if (!cmd) return;
      else {
        if (cooldown == false) {
          cooldown = true;
          cmd.run(client, msg, args);
          //console.log(cooldown);
        }
        else {
          console.log("timing out");
          setTimeout(function () {
            cooldown = false;
          }, 10000)
            msg.channel.send({embed: {
              color: client.color,
              description: `‼️**COOLDOWN** Please wait ${Number((now - 100000), 2)} seconds`}})
          .then(() => {msg.delete(2000)});
        }
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
                description: `‼️ **Blacklisted word detected:** ${wordsArray[j]}`
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
          if (r.channel === "any channel") {
            msg.channel.send({embed: {
                color: client.color,
                description: `✨⤴️ ${msg.author.username} leveled up to **Lv.${row.level+1}**!`
            }});
          }
          else {
            var channel = msg.guild.channel.get(r.channel);
            channel.send({embed: {
              color: client.color,
              description: `✨⤴️ ${msg.author.username} leveled up to **Lv.${row.level+1}**!`
            }});
          }
        }).catch(() => {
          msg.channel.send({embed: {
              color: client.color,
              description: `✨⤴️ ${msg.author.username} leveled up to **Lv.${row.level+1}**!`
          }});
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
          if (r.channel !== "any channel") {
            msg.channel.send({embed: {
                color: client.color,
                description: `🎁 ${msg.author.username}, you picked up the **${acquired}**!`
            }});
          }
          else {
            var channel = msg.guild.channel.get(r.channel);
            channel.send({embed: {
                color: client.color,
                description: `🎁 ${msg.author.username}, you picked up the **${acquired}**!`
            }});
          }
        }).catch(() => {
          msg.channel.send({embed: {
                color: client.color,
                description: `🎁 ${msg.author.username}, you picked up the **${acquired}**!`
          }});
        });
      }
      else return;
    });
  }
  }
  else {
    //if cooldown is reached
    var cooldown = false;
    const now = Date.now();
      const args = msg.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      const cmd = client.commands.get(command);
      if (!cmd) return;
      else {
        if (cooldown == false) {
          cooldown = true;
          cmd.run(client, msg, args);
          //console.log(cooldown);
        }
    else {
      console.log("timing out");
      setTimeout(function () {
        cooldown = false;
      }, 10000)
        msg.channel.send({embed: {
          color: client.color,
          description: `‼️**COOLDOWN** Please wait ${Number((now - 100000), 2)} seconds`}})
      .then(() => {msg.delete(2000)});
      }
    }
  }
}