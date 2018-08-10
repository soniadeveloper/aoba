module.exports = { name: "emoji", run(client, msg, args) {
  if (!msg.member.hasPermission("MANAGE_EMOJIS")) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️You don't have permission to create emojis!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else if (!msg.guild.me.hasPermission("MANAGE_EMOJIS")) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Aoba doesn't have permission to create emojis! Please grant the Aoba role the **Manage emojis** permission.")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    if (args[0] === "delete") {
      var arg = args[1];
      console.log(arg);
      if (arg === undefined) {
         console.error;
         msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Please provide a name!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      }
      else if (!msg.guild.emojis.exists("name", arg)) {
        console.log((!msg.guild.emojis.exists("name", arg)), (!msg.guild.emojis.has(arg.id)));
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Could not find the given emoji!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      }
      else {
        var emoji = msg.guild.emojis.find("name", arg);
        msg.guild.deleteEmoji(emoji).then(() => {
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Emoji has been deleted."))
          .catch(err => {
            console.error(err);
            msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️An error occurred!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
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
         msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`❗️An error occured: ${error}`)).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      });
    }
  }
},}