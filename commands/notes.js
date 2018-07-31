exports.run = (client, msg, args) => {
  function makeList(notes) {
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
  const id = msg.author.id;
  const notes = client.notes.get(id);
  if (args.length == 0) {
    if (notes === undefined) { //if row doesn't exist
      client.notes.set(id, []);
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setTitle(`🗒 \`${msg.author.username}'s notes:\``).setDescription("You have no notes!")).catch(err => {console.error(err)});
    }
    else if (notes === null || notes.length == 0) {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setTitle(`🗒 \`${msg.author.username}'s notes:\``).setDescription("You have no notes!")).catch(err => {console.error(err)});
    }
    else {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setTitle(`🗒 \`${msg.author.username}'s notes:\``).setDescription(makeList(notes))).catch(err => {console.error(err)});
    }
  }
  else {
    if (args[0] === "add") {
      args.shift();
      var note = args.join(" ");
      if (notes === undefined || notes === null) {
        client.notes.set(id, [note]);
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Note has been added!")).catch(err => {console.error(err)});
      }
      else if (notes.length == 5) {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️You have too many notes! Please delete some using `>notes delete` then continue.")).then(msg => {msg.delete(4000)}).catch(err => {console.error(err)});
      }
      else {
        notes.push(note);
        client.notes.set(id, notes);
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Note has been added!")).catch(err => {console.error(err)});
      }
    }
    else if (args[0] === "delete") {
      if (notes === undefined) {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️There is nothing to delete!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
      }
      else if (notes.length == 0) {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️There is nothing to delete!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
      }
      else if (args[1] === undefined) {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setTitle(`🗒 \`${msg.author.username}'s notes:\``).setDescription(`${makeList(notes[id].notes)}\n Use \`>notes delete [number]\` to delete a specific note.`)).catch(err => {console.error(err)});
      }
      else if (isNaN(args[1]) && args[1] !== "all") {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️That is not a valid number!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
      }
      else {
        if (args[1] === "all") {
          client.notes.set(id, []);
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Notes have been purged!"));
        }
        else {
          var index = parseInt(args[1]);
          if (index > notes.length) {
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️That does not correspond to a valid note!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
          }
          else {
            notes.splice(index-1, 1);
            client.notes.set(id, notes);
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Note has been deleted!"));
          }
        }
      }
    }
    else {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Invalid argument!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
    }
  }
}