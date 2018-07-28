exports.run = (client, msg, args) => {
  function makeList(str) {
      var notes = str.split(",");
      var list = "";
      for (var i  = 0; i < notes.length; i++) {
        if (!(notes[i] === " ")) {
          list += `☑️ **${i+1}**: ${notes[i]}\n`;
        }
      }
      if (list === "") {
        return "You have no notes!";
      }
      else {
        return list;
      }
    }
  if (args.length == 0) {
    client.sql.get(`SELECT * FROM notes WHERE userID = '${msg.author.id}'`).then(row => {
      if (!row) {
        client.sql.run("INSERT INTO notes (userID, usernotes) VALUES (?, ?)", [msg.author.id, " "]);
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setTitle(`🗒 \`${msg.author.username}'s notes:\``).setDescription("You have no notes!"));
      }
      else if (row.usernotes === "") {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setTitle(`🗒 \`${msg.author.username}'s notes:\``).setDescription("You have no notes!"));
      }
      else {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setTitle(`🗒 \`${msg.author.username}'s notes:\``).setDescription(makeList(row.usernotes)));
      }
    }).catch(() => {
      client.sql.run("CREATE TABLE IF NOT EXISTS notes (userID TEXT, usernotes TEXT)").then(() => {
        client.sql.run("INSERT INTO notes (userID, usernotes) VALUES (?, ?)", [msg.author.id, " "]).then(() => {msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setTitle(`🗒 \`${msg.author.username}'s notes:\``).setDescription("You have no notes!"));});
      });
    });
  }
  else {
    if (args[0] === "add") {
      args.shift();
      var note = args.join(" ");
      console.log(`Note to add: ${note}`);
      client.sql.get(`SELECT * FROM notes WHERE userID = '${msg.author.id}'`).then(row => {
        if (!row) {
          client.sql.run("INSERT INTO notes (userID, usernotes) VALUES (?, ?)", [msg.author.id, note]).then(() => {
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Note has been added!"));
          });
        }
        else if (!row.usernotes || row.usernotes === null) {
            client.sql.run(`UPDATE notes SET usernotes = "${note}" WHERE userID = ${msg.author.id}`).then(() => {
                console.log(row.usernotes);
                msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Note has been added!`));
              });;
        }
        else {
          console.log(`Notes currently: ${row.usernotes}`);
          if (row.usernotes.split(",").length == 5) {
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️You have too many notes! Please delete some using `>notes delete` then continue.")).then(msg => msg.delete(4000));
          }
          else {
            if (row.usernotes === " " || row.usernotes === "") {
              console.log("list is empty");
              client.sql.run(`UPDATE notes SET usernotes = "${note}" WHERE userID = ${msg.author.id}`).then(() => {
                console.log(row.usernotes);
                msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Note has been added!`));
              });;
            }
            else {
              console.log("list is not empty");
              client.sql.run(`UPDATE notes SET usernotes = "${row.usernotes + "," + note}" WHERE userID = ${msg.author.id}`).then(() => {
                console.log(row.usernotes);
                msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Note has been added!"));
              });
            }
          }
        }
      }).catch(() => {
        client.sql.run("CREATE TABLE IF NOT EXISTS notes (userID TEXT, usernotes TEXT)").then(() => {
          client.sql.run("INSERT INTO notes (userID, usernotes) VALUES (?, ?)", [msg.author.id, note]).then(() => {console.log("list is null")});
        });
      });
    }
    else if (args[0] === "delete") {
      if (args[1] === undefined) {
        client.sql.get(`SELECT * FROM notes WHERE userID = '${msg.author.id}'`).then(row => {
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setTitle(`🗒 \`${msg.author.username}'s notes:\``).setDescription(`${makeList(row.usernotes)}\n Use \`>notes delete [number]\` to delete a specific note.`));
        }).catch(error => {
          console.error(error);
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️You don't have any notes!")).then(msg => msg.delete(2000));
        });
      }
      else if (isNaN(args[1]) && args[1] !== "all") {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️That is not a valid number!")).then(msg => msg.delete(2000));
      }
      else {
         client.sql.get(`SELECT * FROM notes WHERE userID = '${msg.author.id}'`).then(row => {
           var notes = row.usernotes.split(",");
           console.log(notes);
           if (args[1] === "all") {
             client.sql.run(`UPDATE notes SET usernotes = '${" "}' WHERE userID = ${msg.author.id}`).then(() => {
               msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Note has been purged!"));
             });
           }
           else {
             var index = parseInt(args[1]);
             if (index > notes.length) {
                msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️That does not correspond to a valid note!")).then(msg => msg.delete(2000));
            }
             else {
               if (notes.length == 1) {
                 console.log("length is one");
                 client.sql.run(`UPDATE notes SET usernotes = '${" "}' WHERE userID = ${msg.author.id}`).then(() => {
                   msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Note has been deleted!"));
                 });
                 console.log(`"${row.usernotes}"`);
               }
               else {
                 notes.splice(index-1, 1);
                 var newNotes = notes;
                 console.log(`New list: ${newNotes}`);
                 client.sql.run(`UPDATE notes SET usernotes = '${newNotes}' WHERE userID = ${msg.author.id}`).then(() => {
                   msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Note has been deleted!"));
                 });
               }
             }
           }
         }).catch(error => {
          console.error(error);
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️You don't have any notes!")).then(msg => msg.delete(2000));
         });
      }
    }
    else {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Invalid argument!")).then(msg => msg.delete(2000));
    }
  }
}