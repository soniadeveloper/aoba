exports.run = (client, msg, args) => {
  // gives a warning if a certain word is used
  const guildId = msg.guild.id;
  var canManage = msg.member.hasPermission("MANAGE_SERVER");
  if (canManage == false) {
    //console.log("can't manage");
    msg.channel.send({embed: {
            color: client.color,
            description: "🚫 You don't have permission to access the blacklist!"
    }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
  }
  //if no arg is given
  else if (args.length == 0) {
    //console.log("Zero arguments");
    //view list of blacklisted words
    var list = `**${msg.guild.name}'s blacklist:**`;
      client.sql.get(`SELECT * FROM blacklist WHERE guildId = "${msg.guild.id}"`).then(row => {
        //if row does not exist, create row
        if (!row) {
          client.sql.run("INSERT INTO blacklist (guildId, words) VALUES (?, ?)", [guildId, ""]);
          msg.channel.send({embed: {
            color: client.color,
            description: list + `\nThis server has no words blacklisted`
          }});
         }
         //if row does exist, print array as a formatted list
         else {
          //console.log("Row exists.", row.words, row.guildId);
          if(row.words === "") {
            msg.channel.send({embed: {
              color: client.color,
              description: list + "\nThis server has no words blacklisted."
            }});
          }
          else {
            //console.log(row.words);
            var wordsArray = row.words.split(" ");
            for (var i = 0; i < wordsArray.length; i++) {
              list += `\n❌  **${wordsArray[i]}**`;
            }
            msg.channel.send({embed: {
              color: client.color,
              description: list
            }});
          }
        }
      }).catch(() => {
        console.error;
        client.sql.run("CREATE TABLE IF NOT EXISTS blacklist (guildId TEXT UNIQUE, words TEXT)").then(() => {
          client.sql.run("INSERT INTO blacklist (guildId, words) VALUES (?, ?)", [guildId, ""]);
          msg.channel.send({embed: {
            color: client.color,
            description: list + "\nThis server has no words blacklisted."
          }});
        })
      });
  }
  
  //if too many args are given
  else if (args.length > 1) {
    if (args.length == 2 && args[0] === "delete") {
      client.sql.get(`SELECT * FROM blacklist WHERE guildId = "${msg.guild.id}"`).then(row => {
        if(!row) {
          msg.channel.send({embed: {
            color: client.color,
            description: "**ERROR:** This server does not have any words to delete."
          }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
        }
        else {
          var wordsArray = row.words.split(" ");
          var index = -1;
          for (var i = 0; i < wordsArray.length; i++) {
            if (args[1] === wordsArray[i]) {
              index = i;
            }
          }
          if (index == -1) {
            msg.channel.send({embed: {
              color: client.color,
              description: "**ERROR**: Word doesn't exist inside of blacklist."
            }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
          }
          else {
            wordsArray.splice(index, 1);
            var newWords = wordsArray.join(" ");
            client.sql.run(`UPDATE blacklist SET words = '${newWords}' where guildId = '${msg.guild.id}'`);
            msg.channel.send({embed: {
              color: client.color,
              description: `🚫 Word **${args[1]}** has been deleted!`
            }});
          }
        }
      }).catch(() => {
        console.error;
        msg.channel.send({embed: {
              color: client.color,
              description: "**ERROR**: This server doesn't have a blacklist to delete anything from."
        }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
      });
    }
    else {
      msg.channel.send({embed: {
        color: client.color,
        description: "❗️ Too many arguments!"
      }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
    }
  }

  else {
    client.sql.get(`SELECT * FROM blacklist WHERE guildId = "${msg.guild.id}"`).then(row => {
      if(!row) {
        client.sql.run("INSERT INTO blacklist (guildId, words) VALUES (?, ?)", [guildId, args[0]]);
        msg.channel.send({embed: {
            color: client.color,
            description: `The word **${args[0]}** has been blacklisted!`
        }});
      }
      else {
        if (row.words !== "") {
          //console.log("array is not null");
          var wordArray = row.words.split(" ");
          var inArray;
          for (var i = 0; i < wordArray.length; i++) {
            if (args[0] === wordArray[i]) {
              msg.channel.send({embed: {
                  color: client.color,
                  description: `The word **${args[0]}** is already blacklisted!`
              }}).then(msg => {msg.delete(5000)}).catch(err => {console.error(err)});
              inArray = true;
            }
          }
          var newList = row.words + " " + args[0];
          if (inArray !== true) {
            //console.log(row.words);
            client.sql.run(`UPDATE blacklist SET words = '${newList}' WHERE guildId = '${msg.guild.id}'`);
            //console.log(row.words);
            msg.channel.send({embed: {
              color: client.color,
              description: `The word **${args[0]}** has been blacklisted!`
            }});
          }
          else return;
        }
        else {
          //console.log("array is null");
          client.sql.run(`UPDATE blacklist SET words = '${args[0]}' WHERE guildId = '${msg.guild.id}'`);
          //console.log("word has been added", row.words);
          msg.channel.send({embed: {
            color: client.color,
            description: `The word **${args[0]}** has been blacklisted!`
          }});
        }
      }
    }).catch(() => {
      console.error;
      client.sql.run("CREATE TABLE IF NOT EXISTS blacklist (guildId TEXT UNIQUE, words TEXT)").then(() => {
        client.sql.run("INSERT INTO blacklist (guildId, words) VALUES (?, ?)", [guildId, args[0]]);
        msg.channel.send({embed: {
          color: client.color,
          description: `The word **${args[0]}** has been blacklisted!`
        }});
      });
    });
  }
}
