exports.run = (client, msg, args) => {
  var id = msg.author.id;
  if (client.prefixes.get(msg.guild.id) === null) {
    client.prefixes.set(msg.guild.id, process.env.PREFIX);
  }
  let prefix = client.prefixes.get(msg.guild.id);
  client.sql.get(`SELECT * FROM fsd WHERE userId = '${id}'`).then(row => {
    if (!row) {
      if (args[0] === "start") {
        client.sql.run("INSERT INTO fsd (userId, species, level, points, money, rep, items, att, def, mag, spd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id /*user id*/, "Human" /*species*/, 1 /*level*/, 0 /*points*/, 100 /*money*/, 0 /*rep*/, "None" /*items*/, Math.ceil(Math.random()*5)+1, Math.ceil(Math.random()*5)+1, Math.ceil(Math.random()*5)+1, Math.ceil(Math.random()*5)+1 /*stats*/]);
        let embed = client.embed.setColor(client.color).setDescription(`✨ Welcome to Fairies Story 🧚‍, **${msg.author.username}**!\nYour profile has been created! Use command **>fairiesstory** to view it.\nUse command **>fairiesstory species change** to change your species.`);
        msg.channel.send(embed);
      }
      else if (args[0] === "help") {
        msg.channel.send({embed: {
              color: client.color,
              title: "Help",
              description: `Fairies Story 🧚‍ Help (${prefix}fairiesstory or ${prefix}fs)`,
              fields: [
                {
                  name: "`start`",
                  value: "Creates your Fairies Story profile."
                },
                {
                  name: "`species`",
                  value: `View your species. Use \`${prefix}fairiesstory/${prefix}fs species change fairy|orc|elf|gnome|dragonborn|genasi|tiefling|human\` to change your species`
                },
                {
                  name: "`fp`",
                  value: `View how much money you have. Give some FP to another user by using \`${prefix}fairiesstory/fs fp give [number] @[user]\``
                },
                {
                  name: "`stats`",
                  value: "View your stats."
                },
                {
                  name: "`items`",
                  value: `View your items.\nUse \`${prefix}fairiesstory or ${prefix}fs items sell [item] (x[number of items] optional)\` to sell an item in your inventory.\nExample: \`${prefix}fs items sell Yummy Food x3\``
                },
                {
                  name: "`gamble [amount]`",
                  value: "Gamble away a given amount of money."
                },
                {
                  name: "`gacha`",
                  value: "Use the Fairy Gacha Machine for 500FP"
                },
                {
                  name: "`rep [user]`",
                  value: "Give another user with a Fairies Story profile a reputation point. You get rewards for rep'ing users!"
                },
                {
                  name: "`set [channel-name]`",
                  value: `Sets the channel to send level up and item notifications to.\nUse \`${client.prefixes.get(msg.guild.id)}fs set any\` to have it send to any channel. This command requires the **Manage server** permissions`
                },
                {
                  name: "`reward [big/small] [user]`",
                  value: `**This command can only be used by members with Administrator privileges.**\nReward a player in your server for doing a good deed.`
                }
              ]
            }});
      }
      else {
        msg.channel.send({embed: {
          color: client.color,
          description: `⚠️ You don't have a Fairies Story profile! Use \`${prefix}fairiesstory start\` or \`${prefix}fs start\` in order to create a profile!`
        }});
      }
    }
    else {
      //form inventory list
      function formList() {
          var arr = row.items.split(","); //makes string into an array of words
          var final = "";
          var len = client.items.length;
          var amtEach = [];
          //forms amount of each item array
          for (var i = 0; i < len; i++) {
            amtEach.push(0);
          }
          for (var i = 0; i < arr.length; i++) { //for each item that you own
            for (var j = 0; j < len; j++) { //for each item
              if (arr[i] === client.items[j]) {
                amtEach[j] += 1;
              }
            }
          }
          for (var i = 0; i < amtEach.length; i++) {
            if (amtEach[i] > 0) {
              final += `${client.items[i]} x${amtEach[i]}\n`;
            }
          }
          
          /*for (var i = 0; i < arr.length; i++) {
            final += `${arr[i]}\n`
          }*/
          if (final === "") {
            return "None";
          }
          else {
            return final;
          }
        }
      
      function stats(sp) {
          var stats;
          var mod = Math.ceil(row.level / 2);
          var subMod = Math.ceil(row.level / 4); 
          var specialSnowflake = Math.ceil(row.level/5);
          switch (sp) {
            case "fairy":
              //show positive # as plus
              stats = `👊 **Attack:** ${row.att} **-${mod}**\n🛡 **Defense:** ${row.def} **+0**\n✨ **Magic:** ${row.mag} **+${mod}**\n💨 **Speed:** ${row.spd} **+0**`;
              break;
            case "orc":
              stats = `👊 **Attack:** ${row.att} **+0**\n🛡 **Defense:** ${row.def} **+ ${mod}**\n✨ **Magic:** ${row.mag} **+0**\n💨 **Speed:** ${row.spd} **-${mod}**`;
              break;
            case "elf":
              stats = `👊 **Attack:** ${row.att} **+0**\n🛡 **Defense:** ${row.def} **-${mod}**\n✨ **Magic:** ${row.mag} **+0**\n💨 **Speed:** ${row.spd} **+${mod}**`;
              break;
            case "gnome":
              stats = `👊 **Attack:** ${row.att} **+${mod}**\n🛡 **Defense:** ${row.def} **+0**\n✨ **Magic:** ${row.mag} **-${mod}**\n💨 **Speed:** ${row.spd} **+0**`;
              break;
            case "dragonborn":
              stats = `👊 **Attack:** ${row.att} **+${mod}**\n🛡 **Defense:** ${row.def} **+0**\n✨ **Magic:** ${row.mag} **+0**\n💨 **Speed:** ${row.spd} **-${mod}**`;
              break;
            case "tiefling": 
              stats = `👊 **Attack:** ${row.att} **+0**\n🛡 **Defense:** ${row.def} **-${mod}**\n✨ **Magic:** ${row.mag} **+${subMod}**\n💨 **Speed:** ${row.spd} **+${subMod}**`;
              break;
            case "genasi": 
              stats = `👊 **Attack:** ${row.att} **-${mod}**\n🛡 **Defense:** ${row.def} **+${subMod}**\n✨ **Magic:** ${row.mag} **+${subMod}**\n💨 **Speed:** ${row.spd} **+0**`;
              break;
            default:
              stats = `👊 **Attack:** ${row.att} **+${specialSnowflake}**\n🛡 **Defense:** ${row.def} **+${specialSnowflake}**\n✨ **Magic:** ${row.mag} **+${specialSnowflake}**\n💨 **Speed:** ${row.spd} **+${specialSnowflake}**`;
          }
          return stats
        }
      
      if (args === undefined || args.length == 0) {
        //get user profile
        let profile = new client.discord.RichEmbed().setTitle(`**${msg.author.username}'s Profile**`).setColor(client.color)
        .setDescription("Fairies Story 🧚‍")
        .setThumbnail(msg.author.avatarURL)
        .addField("🦇 `Species`", `${row.species}`, true)
        .addField("🎚 `Level`", `${row.level}`, true)
        .addField("⏫ `EXP`", `${row.points}/${Math.pow(2, row.level)}`, true)
        .addField("💵 `Money`", `${row.money} FP`, true)
        .addField("🎓 `Reputation`", `${row.rep} pts`, true)
        .addField("✍️ `Stats`", stats(row.species), true)
        .addField("🎁 `Inventory`", `${formList()}`, true);
        msg.channel.send(profile).catch(() => {console.error; msg.channel.send("❗️There was an error viewing your profile!").then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);});
      }
      else {
        //if an argument is given
        switch (args[0]) {
          case "start":
            //>start, create profile
            msg.channel.send({embed: {
              color: client.color,
              description: `❗️ ${msg.author.username}, you already have a profile.`
            }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
            break;
          case "species":
            //>species
            if (args[1] == "change") {
              if (args[2] === undefined) {
                msg.channel.send({embed: {
                  color: client.color,
                  description: `❗️ Use \`${prefix}fairiesstory or ${prefix}fs species change [choice]\` to change species.\nChoose between fairy/elf/orc/gnome/dragonborn/tiefling/genasi/human`
                }}).then(msg => {msg.delete(4000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
              }
              else if (args[2] === "fairy" || "orc" || "gnome" || "elf" || "human" || "tiefling" || "dragonborn" || "genasi") {
                var old = row.species;
                if (old === args[2]) {
                  msg.channel.send({embed: {
                  color: client.color,
                  description: `❗️ You are already a ${args[2]}!`
                  }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                }
                else {
                  client.sql.run(`UPDATE fsd SET species = '${args[2]}' WHERE userId = ${id}`);
                  msg.channel.send({embed: {
                    color: client.color,
                    description: `✨ You are now a **${args[2]}**!`
                  }});
                }
              }
              else {
                msg.channel.send({embed: {
                  color: client.color,
                  description: "❗️ That's not a valid species name!"
                }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
              }
            }
            else if (args[1] === undefined) {
              msg.channel.send({embed: {
              color: client.color,
              description: `${msg.author.username}, you are currently a **${row.species}**. Use \`${prefix}fairiesstory/${prefix}fs species change [choice]\` to change species.\nChoose between fairy/elf/orc/gnome/dragonborn/tiefling/genasi/human`
              }});
            }
            else {
              msg.channel.send({embed: {
                  color: client.color,
                  description: "❗️ Invalid argument!"
                }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
            }
            break;
          case "fp":
            //>money
            if (args[1] === undefined) {
            msg.channel.send({embed: {
              color: client.color,
              description: `💵 ${msg.author.username}, you currently have **${row.money} FP**.`
            }});
            }
            else {
              if (args[1] === "give") {
                //give money
                var user = msg.mentions.members.firstKey(1);
                var money = parseInt(args[2]);
                if (isNaN(args[2])) {
                  msg.channel.send({embed: {
                    color: client.color,
                    description: "❗️ Please give a valid number!"
                  }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                }
                else if (user === undefined) {
                  msg.channel.send({embed: {
                    color: client.color,
                    description: "❗️ Please mention a user!"
                  }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                }
                else if (user === msg.author.id) {
                  msg.channel.send({embed: {
                        color: client.color,
                        description: "❗️ You can't give yourself money!"
                      }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                }
                else if (money > row.money) {
                  msg.channel.send({embed: {
                    color: client.color,
                    description: "❗️ You don't have that much money available!"
                  }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                }
                else {
                  client.sql.get(`SELECT * FROM fsd WHERE userId = '${user}'`).then(r => {
                    if (!r) {
                      msg.channel.send({embed: {
                        color: client.color,
                        description: "❗️ That user doesn't have a Fairies Story profile!"
                      }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                    }
                    else {
                      var old = row.money;
                      client.sql.run(`UPDATE fsd SET money = ${r.money + money} WHERE userId = ${user}`);
                      client.sql.run(`UPDATE fsd SET money = ${old - money} WHERE userId = ${msg.author.id}`);
                      msg.channel.send({embed: {
                        color: client.color,
                        description: `💸 <@${msg.author.id}> has given <@${user}> **${money} FP**!`
                      }});
                    }

                  }).catch(console.error);
                }
              }
              else {
                  msg.channel.send({embed: {
                  color: client.color,
                  description: "❗️Invalid argument!"
                }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
              }
            }
            break;
          case "stats":
            msg.channel.send({embed: {
              color: client.color,
              title: `${msg.author.username}'s Stats`,
              description: `${stats(row.species)}`
            }});
            break;
          case "items":
            //>items
            if (args[1] === undefined) {
              //if no argument is given
              msg.channel.send({embed: {
                color: client.color,
                title: `🎁 ${msg.author.username}'s Inventory`,
                description: `${formList()}`
              }});
            }
            else if (args[1] === "sell") {
              //if user wants to sell item
              if (args.length < 2) {
                // if no item was provided
                  msg.channel.send({embed: {
                  color: client.color,
                  description: "❗️Must provide an item to sell!"
                }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
              }
              else {
                var arr = args.slice(2).join(" ");
                var name = args.slice(2).join(" ").split(" x")[0];
                console.log(name);
                var num = args.slice(2).join(" ").split(" x")[1];
                console.log(num);
                var sell = name.toLowerCase();
                var av = [];
                for (var i = 0; i < client.items.length; i++) {
                  av.push(client.items[i].substring(3, client.items[i].length).toLowerCase());
                }
                //check if item is valid
                var isEqual = 0;
                for (var i = 0; i < av.length; i++) {
                    if (av[i] === sell) {
                      isEqual += 1;
                    }
                }
                if (isEqual < 1) {
                  msg.channel.send({embed: {
                    color: client.color,
                    description: "❗️ That is not a valid item!"
                  }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                }
                else {
                  //checks if you have this item
                  if (num === undefined) {
                    var has = 0;
                    var index = -1;
                    var list = row.items.split(",");
                    for (var i = 0; i < list.length; i++) {
                      list[i] = list[i].substring(3, list[i].length).toLowerCase();
                    }
                    for (var i = 0; i < list.length; i++) {
                      if (list[i] === sell) {
                        has += 1;
                        if (index < 0) {
                          index = i;
                        }
                      }
                    }
                    if (has < 1 || index < 0) {
                      msg.channel.send({embed: {
                        color: client.color,
                        description: "❗️ You don't have this item!"
                      }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                    }
                    else {
                      var gain;
                      switch (sell) {
                        case "yummy food":
                          gain = 10;
                          break;
                        case "golden key":
                          gain = 200;
                          break;
                        case "deer brain":
                          gain = 30;
                          break;
                        case "bottle of liquor":
                          gain = 20;
                          break;
                        case "spotted mushroom":
                          gain = 5;
                          break;
                        case "shiny ring":
                          gain = 1000;
                          break;
                        case "rainbow d20":
                          gain = 40;
                          break;
                        case "attorney badge":
                          gain = 100;
                          break;
                        case "annoying dog":
                          gain = 50;
                          break;
                        case "dog residue":
                          gain = 3;
                          break;
                        case "hot dog...?":
                          gain = 15;
                          break;
                        case "toy knife":
                          gain = 7;
                          break;
                        case "handsome boyfriend":
                          gain = 500;
                          break;
                        case "newborn infant":
                          gain = 15;
                          break;
                        case "heterosexual couple":
                          gain = 800;
                          break;
                        case "butts pie":
                          gain = 11;
                          break;
                        case "chaos emerald":
                          gain = 5000;
                          break;
                        case "max elixir":
                          gain = 70;
                          break;
                        case "super potion":
                          gain = 25;
                          break;
                        case "lonlon milk":
                          gain = 6;
                          break;
                        case "soothe bell":
                          gain = 60;
                          break;
                        case "cleanse tag":
                          gain = 13;
                          break;
                      }
                      var items = row.items.split(",");
                      var newArray = items.splice(index, 1);
                      var newItems = items.join(",");
                      client.sql.run(`UPDATE fsd SET money = ${row.money + gain}, items = '${newItems}' WHERE userId = ${id}`);
                      msg.channel.send({embed: {
                        color: client.color,
                        title: "💰Gnome Market",
                        description: `${msg.author.username}, you sold a ${name} and gained **${gain} FP! 💸**`
                      }});
                    }
                  }
                  else {
                    var has = 0;
                    var index;
                    var list = row.items.split(",").sort();
                    for (var i = 0; i < list.length; i++) {
                      if (list[i].substring(3).toLowerCase() === sell) {
                        has += 1;
                        if (index === undefined) {
                          index = i;
                        }
                      }
                    }
                    if (has < num || index === undefined) {
                      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️You don't have enough of that item to sell!"))
                                       .then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                    }
                    else {
                      switch (sell) {
                        case "yummy food":
                          gain = 10;
                          break;
                        case "golden key":
                          gain = 200;
                          break;
                        case "deer brain":
                          gain = 30;
                          break;
                        case "bottle of liquor":
                          gain = 20;
                          break;
                        case "spotted mushroom":
                          gain = 5;
                          break;
                        case "shiny ring":
                          gain = 1000;
                          break;
                        case "rainbow d20":
                          gain = 40;
                          break;
                        case "attorney badge":
                          gain = 100;
                          break;
                        case "annoying dog":
                          gain = 50;
                          break;
                        case "dog residue":
                          gain = 3;
                          break;
                        case "hot dog...?":
                          gain = 15;
                          break;
                        case "toy knife":
                          gain = 7;
                          break;
                        case "handsome boyfriend":
                          gain = 500;
                          break;
                        case "newborn infant":
                          gain = 15;
                          break;
                        case "heterosexual couple":
                          gain = 800;
                          break;
                        case "butts pie":
                          gain = 11;
                          break;
                        case "chaos emerald":
                          gain = 5000;
                          break;
                        case "max elixir":
                          gain = 70;
                          break;
                        case "super potion":
                          gain = 25;
                          break;
                        case "lonlon milk":
                          gain = 6;
                          break;
                        case "soothe bell":
                          gain = 60;
                          break;
                        case "cleanse tag":
                          gain = 13;
                          break;
                      }
                      var items = row.items.split(",").sort();
                      var newArray = items.splice(index, num);
                      var newItems = items.join(",");
                      client.sql.run(`UPDATE fsd SET money = ${row.money + (gain*num)}, items = '${newItems}' WHERE userId = ${id}`);
                      msg.channel.send({embed: {
                        color: client.color,
                        title: "💰Gnome Market",
                        description: `${msg.author.username}, you sold ${num} ${name}s and gained **${gain*num} FP! 💸**`
                      }});
                    }
                  }
                }
              }
            }
            break;
          case "gacha":
            if (row.money < 500) {
              msg.channel.send({embed: {
              color: client.color,
              description: "❗️You don't have enough money to use the Fairy Gacha! You need **500 FP** in order to use the gacha machine."
            }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
            }
            else {
            var choices = client.items;
            var chance = Math.floor(Math.random() * choices.length);
            var result = choices[chance];
            if (row.items === "None") {
              client.sql.run(`UPDATE fsd SET money = ${row.money - 500}, items = '${result}' where userId = ${id}`);
            }
            else {
              client.sql.run(`UPDATE fsd SET money = ${row.money - 500}, items = '${row.items + "," + result}' where userId = ${id}`);
            }
            msg.channel.send({embed: {
              color: client.color,
              title: `🎁 Fairy Gacha`,
              description: `**${msg.author.username}**, you inserted 500 FP into the Gacha Machine and obtained a **${result}**!`
            }});
            }
            break;
          case "rep":
            // >rep @
            var list = msg.mentions.members;
              if (list.first() === undefined) {
                msg.channel.send({embed: {
                  color: client.color,
                  description: "❗️Please list a user to give a reputation point to!"
                }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
              }
              else {
                var time;
                var oldrep;
                const DAY = 86400000;
                var oldAmt = row.money;
                client.sql.get(`SELECT * FROM fsd WHERE userId = '${list.firstKey(1)}'`).then(r => {
                  if (!r) {
                    msg.channel.send({embed: {
                      color: client.color,
                      description: "🚫 This user doesn't have a Fairies Story profile!"
                    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                  }
                  else if (r.userId === msg.author.id) {
                    msg.channel.send({embed: {
                      color: client.color,
                      description: `❗️ You can't give yourself reputation points!`
                    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                  }
                  else {
                    time = Date.now();
                    const DAY = 86400000;
                    client.sql.run(`ALTER TABLE fsd ADD COLUMN time INTEGER default ${time}`).then(() => {
                      //column does not exist
                      time = Date.now();
                      client.sql.run(`UPDATE fsd SET rep = ${row.rep + 1} WHERE userId = ${list.firstKey(1)}`);
                      client.sql.run(`UPDATE fsd SET money = ${oldAmt + 100} WHERE userId = ${id}`);
                      msg.channel.send({embed: {
                        color: client.color,
                        description: `✨ <@${msg.author.id}> has given <@${list.firstKey(1)}> a reputation point! You got 100 FP for your good deed!`
                      }});
                      client.sql.run(`UDPATE fsd SET time = ${time+DAY} WHERE userId = ${id}`);
                    }).catch(() => {
                      //column does exist
                        time = Date.now();
                        if (row.time !== null && time <= row.time) { 
                          var remaining = row.time - time;
                          var hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
                          var minutes = Math.floor((remaining / (1000 * 60)) % 60);
                          msg.channel.send({embed: {
                            color: client.color,
                            description: `❗️ You've already given a reputation point today! You must wait **${hours}** hours and **${minutes}** minutes.`
                          }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                        }
                      else {
                        time = Date.now();
                        const DAY = 86400000;
                        client.sql.run(`UPDATE fsd SET rep = ${r.rep + 1} WHERE userId = ${list.firstKey(1)}`);
                        client.sql.run(`UPDATE fsd SET money = ${oldAmt + 100} WHERE userId = ${id}`);
                        msg.channel.send({embed: {
                          color: client.color,
                          description: `✨ <@${msg.author.id}> has given <@${list.firstKey(1)}> a reputation point! You got 100 FP for your good deed!`
                        }});
                        if (row.time === null) {
                          client.sql.run(`UPDATE fsd SET time = ${time + DAY} WHERE userId = ${id}`);
                        }
                        else {
                          client.sql.run(`UPDATE fsd SET time = ${time + DAY} WHERE userId = ${id}`);
                        }
                      }
                    });
                  }
                }).catch(console.error);
              }
            break;
          case "gamble":
            //>gamble money
            if (args[1] === undefined || isNaN(args[1])) {
              //if no argument is given or if the argument is not a number
              msg.channel.send({embed: {
                color: client.color,
                description: "❗️ Please give an amount to gamble!"
              }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
            }
            else {
              var amount = parseInt(args[1]);
              if (amount > row.money) {
                msg.channel.send({embed: {
                  color: client.color,
                  description: "❗️ You don't have that much money!"
                }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
              }
              else {
                //gamble here
                client.sql.run(`UPDATE fsd SET money = ${row.money - amount} WHERE userId = ${id}`);
                var luck = Math.floor(Math.random()*3);
                if (luck < 2) {
                  msg.channel.send({embed: {
                    color: client.color,
                    title: "🧝‍ Elvish Casino",
                    description: `💸 ${msg.author.username}, you gambled ${amount} FP and lost your money! :(`
                  }});
                }
                else {
                  var rand = Math.floor(Math.random()*16) + 1;
                  var mult;
                  if (rand < 9) { // 8
                    mult = 0;
                  }
                  else if (rand >= 8 && rand < 13) { //4
                    mult = 1;
                  }
                  else if (rand >= 13 && rand < 16) { //2
                    mult = 2;
                  }
                  else { //1
                    mult = 3;
                  }
                  var earning = amount * mult;
                  var old = row.money;
                  client.sql.run(`UPDATE fsd SET money = ${row.money + earning} WHERE userId = ${id}`);
                  if (mult == 0){
                      msg.channel.send({embed: {
                      color: client.color,
                      title: "🧝‍ Elvish Casino",
                      description: `💸 ${msg.author.username}, you gambled ${amount} FP and had no gains or losses!`
                    }});
                  }
                  else {
                    msg.channel.send({embed: {
                      color: client.color,
                      title: "🧝‍ Elvish Casino",
                      description: `💸 **Wow!** ${msg.author.username}, you gambled ${amount} FP and earned **${earning}** FP!`
                    }});
                  }
                }
              }
            }
            break;
          case "set":
            client.sql.get(`SELECT * FROM fschannels WHERE guildId = '${msg.guild.id}'`).then(r => {
              if (!r) {
                console.log("row does not exist");
                if (args[1] === undefined) { //if no argument was given
                  client.sql.run("INSERT INTO fschannels (guildId, channel) VALUES (?, ?)", [msg.guild.id, "any"]).then(() => {
                    msg.channel.send(new client.discord.RichEmbed()
                                 .setColor(client.color)
                                 .setDescription(`Notifications are set to send to **any channel**\nUse \`${prefix}fs or fairiesstory set [name]\` to change the channel`));
                  });
                }
                else {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) { //if user doesn't have permission
                    msg.channel.send(new client.discord.RichEmbed()
                                 .setColor(client.color)
                                 .setDescription(`❗️ You don't have permission to use this command! You must have the **Manage server** permission.`))
                    .then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                  }
                  else { //if user does have permission
                    var name = args.join("-");
                    if (msg.guild.channels.find("name", name) === undefined) { //if channel can't be found
                      if (name === "any") {
                        msg.channel.send(new client.discord.RichEmbed()
                                   .setColor(client.color)
                                   .setDescription(`✅ Notifications will be sent to **any channel**!`))
                     .then(msg => {msg.delete(3000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                      }
                      else {
                        msg.channel.send(new client.discord.RichEmbed()
                                   .setColor(client.color)
                                   .setDescription(`❗️ A channel with that name could not be found!`))
                      .then(msg => {msg.delete(3000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                      }
                    }
                    else {
                      client.sql.run("INSERT INTO fschannels (guildId, channel) VALUES (?, ?)", [msg.guild.id, msg.guild.channels.find("name", name).id]).then(() => {
                      msg.channel.send(new client.discord.RichEmbed()
                                   .setColor(client.color)
                                   .setDescription(`✅ Notifications will be sent to **${name}**`));
                    });
                    }
                  }
                }
              }
              else { //if row does exist
                if (args[1] === undefined) { //if no argument was given
                  console.log("row does exist");
                  if (r.channel === "any" || r.channel === "any channel") {
                    msg.channel.send(new client.discord.RichEmbed()
                                    .setColor(client.color)
                                    .setDescription(`Notifications are set to send to **any channel**\nUse \`${prefix}fs or fairiesstory set [name]\` to change the channel`));
                  }
                  else {
                    msg.channel.send(new client.discord.RichEmbed()
                                    .setColor(client.color)
                                    .setDescription(`Notifications are set to send to **${msg.guild.channels.get(r.channel).name}**\nUse \`${prefix}fs or fairiesstory set [name]\` to change the channel or use \`${prefix}fs or fairiesstory set any\` to reset the channel.`));
                  }
                }
                else {
                  if (!msg.member.hasPermission("MANAGE_GUILD") || !msg.member.hasPermission("ADMINISTRATOR")) { //if user doesn't have permission
                    msg.channel.send(new client.discord.RichEmbed()
                                 .setColor(client.color)
                                 .setDescription(`❗️ You don't have permission to use this command! You must have the **Manage server** permission.`))
                    .then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                  }
                  else { //if user does have permission
                    args.shift();
                    var name = args.join("-");
                    if (msg.guild.channels.find("name", name) === undefined || msg.guild.channels.find("name", name) === null) { //if channel can't be found
                      if (name === "any") {
                        client.sql.run(`UPDATE fschannels SET channel = 'any' WHERE guildId = ${msg.guild.id}`);
                        msg.channel.send(new client.discord.RichEmbed()
                                   .setColor(client.color)
                                   .setDescription(`✅ Notifications will be sent to **any channel**!`))
                        .then(msg => {msg.delete(3000)}).catch(err => {console.error(err)});
                      }
                      else {
                        msg.channel.send(new client.discord.RichEmbed()
                                   .setColor(client.color)
                                   .setDescription(`❗️ A channel with that name could not be found!`))
                      .then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                      }
                    }
                    else {
                      client.sql.run(`UPDATE fschannels SET channel = '${msg.guild.channels.find("name", name).id}' WHERE guildId = ${msg.guild.id}`).then(() => {
                      msg.channel.send(new client.discord.RichEmbed()
                                   .setColor(client.color)
                                   .setDescription(`✅ Notifications will be sent to **${name}**`));
                      });
                    }
                  }
                }
              }
            }).catch(error => {
              console.log("error");
              console.error(error);
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`❗️An error occurred: ${error}`));
              /*client.sql.run("CREATE TABLE IF NOT EXISTS fschannels (guildId TEXT UNIQUE, channel TEXT)").then(() => {
                if (args[1] === undefined) { //if no argument was given
                  client.sql.run("INSERT INTO fschannels (guildId, channel) VALUES (?, ?)", [msg.guild.id, "any channel"]).then(r => {
                    msg.channel.send(new client.discord.RichEmbed()
                                 .setColor(client.color)
                                 .setDescription(`Notifications are set to send to **${r.channel}**\nUse \`${process.env.PREFIX}fs or fairiesstory set [name]\` to change the channel`));
                  });
                }
                else {
                  if (!msg.member.hasPermission("MANAGE_GUILD", true, true) || !msg.member.hasPermission("ADMINISTRATOR")) { //if user doesn't have permission
                    msg.channel.send(new client.discord.RichEmbed()
                                 .setColor(client.color)
                                 .setDescription(`❗️ You don't have permission to use this command! You must have the **Manage server** permission.`))
                    .then(msg => {msg.delete(3000)}).catch(err => {console.error(err)});
                  }
                  else { //if user does have permission
                    var name = args.join("-");
                    if (msg.guild.channels.find("name", name) === undefined) { //if channel can't be found
                      msg.channel.send(new client.discord.RichEmbed()
                                 .setColor(client.color)
                                 .setDescription(`❗️ A channel with that name could not be found!`))
                    .then(msg => {msg.delete(3000)}).catch(err => {console.error(err)});
                    }
                    else {
                      client.sql.run("INSERT INTO fschannels (guildId, channel) VALUES (?, ?)", [msg.guild.id, name]).then(() => {
                      msg.channel.send(new client.discord.RichEmbed()
                                   .setColor(client.color)
                                   .setDescription(`✅ Notifications will be sent to **${name}**`));
                    });
                    }
                  }
                }
              });*/
            });
              break;
          case "reward":
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
            var current = Date.now();
            const WEEK = 604800000;
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
              console.log("does not have permission");
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️You don't have permission to use this command! Only **administrators** can use this command."))
              .then(msg => {msg.delete(4000)
              .then(() => console.log("sent")).catch(console.error)}).catch(console.error);
            }
            else if (notBots(msg.guild) < 5) {
              console.log("guild is too small");
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Your server is too small to use this command! Your server must have **10 or more** people."))
              .then(msg => {msg.delete(4000)
                           .then(() => console.log("sent")).catch(console.error)}).catch(console.error);
            }
            else if (current - msg.guild.createdTimestamp < WEEK) {
              console.log("guild is too recent");
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Your server must be at least **7 days old** in order to use this command!"))
              .then(msg => {msg.delete(4000)
                           .then(() => console.log("sent")).catch(console.error)}).catch(console.error);
            }
            else {
              if (args[1] === undefined) {
                console.log("undefined reward size");
                msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`❗️Missing arguments!\nThe correct format is \`${prefix}fs reward [big/small] [user]\``))
                .then(msg => {msg.delete(4000)
                             .then(() => console.log("sent")).catch(console.error)}).catch(console.error);
              }
              else {
                console.log(args[1] === "small");
                if (args[1] !== "small" && args[1] !== "big") {
                  console.log("invalid reward size");
                  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`❗️Invalid argument!\nThe correct format is \`${prefix}fs reward [big/small] [user]\``))
                .then(msg => {msg.delete(4000)
                             .then(() => console.log("sent")).catch(console.error)}).catch(console.error);
                }
                else {
                  var member = msg.mentions.members.first();

                  if (member.id === msg.author.id) {
                    console.log("cannot reward yourself");
                    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️You can't reward yourself!"))
                    .then(msg => {msg.delete(4000)
                    .then(() => console.log("sent")).catch(console.error)}).catch(console.error);
                  }
                  else {
                    var curr = Date.now();
                    const HOUR = 3600000;
                    client.sql.get(`SELECT * FROM fsd WHERE userId = '${member.id}'`).then(r => {
                      if (!r) {
                        console.log("receiver does not have profile");
                        msg.channel.send({embed: {
                          color: client.color,
                          description: "🚫 This user doesn't have a Fairies Story profile!"
                        }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
                      }
                      else {
                        client.sql.run(`ALTER TABLE fsd ADD COLUMN rewardtime INTEGER default ${curr}`).then(() => {
                          console.log("column does not exist");
                          var repAmt;
                          var moneyAmt;
                          if (args[1] === "small") {
                            client.sql.run(`UPDATE fsd SET rep = ${r.rep + 1} WHERE userId = ${member.id}`);
                            client.sql.run(`UPDATE fsd SET money = ${r.money + 1000} WHERE userId = ${member.id}`);
                            repAmt = 1;
                            moneyAmt = 1000;
                          }
                          else {
                            client.sql.run(`UPDATE fsd SET rep = ${r.rep + 3} WHERE userId = ${member.id}`);
                            client.sql.run(`UPDATE fsd SET money = ${r.money + 5000} WHERE userId = ${member.id}`);
                            repAmt = 3;
                            moneyAmt = 5000;
                          }
                          client.sql.run(`UPDATE fsd SET rewardtime = ${curr + HOUR} WHERE userID = ${msg.author.id}`);
                          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✨☺️ <@${member.id}>, you received **${repAmt}** reputation point(s) and **${moneyAmt}FP** for doing something your server admin considered to be commendable!`));
                        }).catch(() => {
                          console.log("column does exist");
                          var curr = Date.now();
                          const HOUR = 3600000;
                          console.log(curr);
                          console.log(row.rewardtime);
                          if (curr < row.rewardtime) {
                            console.log("wait");
                            var remaining = row.rewardtime - curr;
                            console.log(remaining);
                            var minutes = Math.floor((remaining / (1000 * 60)) % 60);
                            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`❗️You must wait **${minutes}** minutes to use this command again!`))
                              .then(msg => {msg.delete(4000)
                               .then(() => console.log("sent")).catch(console.error)}).catch(console.error);
                          }
                          else {
                            var repAmt;
                            var moneyAmt;
                            if (args[1] === "small") {
                              console.log("give small reward");
                              client.sql.run(`UPDATE fsd SET rep = ${r.rep + 1} WHERE userId = ${member.id}`);
                              client.sql.run(`UPDATE fsd SET money = ${r.money + 1000} WHERE userId = ${member.id}`);
                              repAmt = 1;
                              moneyAmt = 1000;
                            }
                            else {
                              console.log("give big reward");
                              client.sql.run(`UPDATE fsd SET rep = ${r.rep + 3} WHERE userId = ${member.id}`);
                              client.sql.run(`UPDATE fsd SET money = ${r.money + 5000} WHERE userId = ${member.id}`);
                              repAmt = 3;
                              moneyAmt = 5000;
                            }
                          client.sql.run(`UPDATE fsd SET rewardtime = ${curr + HOUR} WHERE userID = ${msg.author.id}`);    
                          console.log(row.rewardtime);
                          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✨☺️ <@${member.id}>, you received **${repAmt}** reputation point(s) and **${moneyAmt}FP** for doing something your server admin considered to be commendable!`));
                          }
                        });
                      }
                    }).catch(console.error);
                  }
                }
              }
            }
            break;
          /*case "encounter":
            //encounter an enemy
            //enemies: lost businessman, forest rabbit, small tiger
            var stats = [row.att, row.def, row.mag, row.spd];
            var mod = Math.ceil(row.level / 2);
            var subMod = Math.ceil(row.level / 4); 
            var ss = Math.ceil(row.level/5);
            switch (row.species) {
              case "fairy":
                stats = [row.att - mod, row.def, row.mag + mod, row.spd];
                break;
              case "orc":
                stats = [row.att, row.def + mod, row.mag, row.spd - mod];
                break;
              case "elf":
                stats = [row.att, row.def - mod, row.mag, row.spd + mod];
                break;
              case "gnome":
                stats = [row.att + mod, row.def, row.mag - mod, row.spd];
                break;
              case "dragonborn":
                stats = [row.att + mod, row.def, row.mag, row.spd - mod];
                break;
              case "tiefling":
                stats = [row.att, row.def - mod, row.mag + subMod, row.spd];
                break;
              case "genasi":
                stats = [row.att - mod, row.def + subMod, row.mag, row.spd];
                break;
              default:
                stats = [row.att + ss, row.def + ss, row.mag + ss, row.spd + ss];
                break;
            }
            var spawn = {
              enemies: ["Forest Rabbit 🐇", "Lost Businessman 👨‍💼", "Small Tiger 🐯", "Gelatinous Cube ◻️", "Owlbear 🐻", "Beholder 👁"],
              stats: {},
              fasterBrave: function () {
                return "You had the option to run but chose to fight anyways!";
              },
              fasterCoward: function() {
                return "You decided to run away!";
              },
              slower: function() {
                return "You can't run away!"
              }
            }
            var enemy;
            var enemyStats;
            var num = 0;
            for (var i = spawn.enemies.length; i > 0; i--) {
              num += i;
            }
            var rand = Math.floor(Math.random() * num) + 1;
            if (rand < 6 && rand >= 1) {
              enemy = spawn.enemies[0];
              
            }
            else if (rand >= 6 && rand < 11) {
              enemy = spawn.enemies[1];
            }
            else if (rand >= 11 && rand < 15) {
              enemy =spawn.enemies[2];
            }
            else if(rand >= 15 && rand < 18) {
              enemy = spawn.enemies[3];
            }
            else if(rand >= 18 && rand < 20) {
              enemy = spawn.enemies[4];
            }
            else {
              enemy = spawn.enemies[5];
            }
            break;*/
          case "help":
            msg.channel.send({embed: {
              color: client.color,
              title: "Help",
              description: "Fairies Story 🧚‍ Help (>fairiesstory or >fs)",
              fields: [
                {
                  name: "`start`",
                  value: "Creates your Fairies Story profile."
                },
                {
                  name: "`species`",
                  value: `View your species. Use \`${prefix}fairiesstory/${prefix}fs species change fairy|orc|elf|gnome|dragonborn|genasi|tiefling|human\` to change your species`
                },
                {
                  name: "`fp`",
                  value: `View how much money you have. Give some money to another user by using \`${prefix}fairiesstory/fs fp give [number] @[user]\``
                },
                {
                  name: "`stats`",
                  value: "View your stats."
                },
                {
                  name: "`items`",
                  value: `View your items.\nUse \`${prefix}fairiesstory or ${prefix}fs items sell [item] (x[number of items] optional)\` to sell an item in your inventory.\nExample: \`${prefix}fs items sell Yummy Food x3\``
                },
                {
                  name: "`gamble [amount]`",
                  value: "Gamble away a given amount of money."
                },
                {
                  name: "`gacha`",
                  value: "Use the Fairy Gacha Machine for 500FP"
                },
                {
                  name: "`rep [user]`",
                  value: "Give another user with a Fairies Story profile a reputation point. You get rewards for rep'ing users!"
                },
                {
                  name: "`set [channel-name]`",
                  value: `Sets the channel to send level up and item notifications to.\nUse \`${client.prefixes.get(msg.guild.id)}fs set any\` to have it send to any channel. This command requires the **Manage server** permissions`
                },
                {
                  name: "`reward [big/small] [user]`",
                  value: `**This command can only be used by members with Administrator privileges.**\nReward a player in your server for doing a good deed.`
                }
              ]
            }});
            break;
          case "reset":
            if (args[1] == "items") {
              //ONLY USE THIS COMMAND FOR DEBUGGING PURPOSES
              client.sql.run(`UPDATE fsd SET items = 'None' WHERE userId = ${id}`);
              msg.channel.send({embed: {
                color: client.color,
                description: "✅ Your items have been reset!"
              }});
            }
            break;
          default:
            msg.channel.send({embed: {
                color: client.color,
                description: `❗️ Invalid argument!`
            }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
           break; 
        }
      }
    }
  }).catch(error => {
    console.error(error);
    client.sql.run("CREATE TABLE IF NOT EXISTS fsd (userId TEXT, species TEXT, level INTEGER, points INTEGER, money INTEGER, rep INTEGER, items TEXT, att INTEGER, def INTEGER, mag, INTEGER, spd INTEGER)").then(() => {
      msg.channel.send({embed: {
              color: client.color,
              description: "⚠️ An unknown error occured!"
      }}).then(msg => {msg.delete(3000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
    });
  });
}
