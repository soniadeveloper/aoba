exports.run = (client, msg, args) => {
  if (!msg.member.hasPermission("MANAGE_EMOJIS")) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️You don't have permission to create emojis!")).then(msg => { msg.delete(2000) }).catch(err => {console.error(err)});
  }
  else if (!msg.guild.me.hasPermission("MANAGE_EMOJIS")) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Aoba doesn't have permission to create emojis! Please grant the Aoba role the **Manage emojis** permission.")).then(msg => {msg.delete(2000) }).catch(err => {console.error(err)});
  }
  else {
    if (args[0] === "delete") {
      var name = args[1];
      if (name === undefined) {
         console.error;
         msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Please provide a name!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
      }
      else if (!msg.guild.emojis.exists("name", name)) {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Could not find an emoji with that name!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
      }
      else {
        msg.guild.deleteEmoji(msg.guild.emojis.find("name", name)).then(() => {
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Emoji has been deleted."))
          .catch(err => {
            console.error(err);
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️An error occurred!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
          });
        });
      }
    }
    else {
      var url = args[0];
      var name = args[1];
      msg.guild.createEmoji(url, name).then(emoji => {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Emoji has been made! ${msg.guild.emojis.find("name", name)}`));
      }).catch(error => {
        console.error;
         msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`❗️An error occured: ${error}`)).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
      });
    }
  }
}