exports.run = (client, msg, args) => {
  var c = msg.channel;
  function listOverwrites(c) {
    var list = "";
    var overwrites = c.permissionOverwrites.array()
    for (var i = 0; i < overwrites.length; i++) {
      list += `‣ ${overwrites[i].type}\n`;
    }
    if (list === "") {
      return "None";
    }
    else {
      return list;
    }
  }
  if (args.length == 0) {
    var embed = new client.discord.RichEmbed().setColor(client.color).setTitle(`\`${c.name}\``)
    .addField("ID", c.id, true)
    .addField("Date Created", c.createdAt)
    .addField("Type", c.type, true)
    .addField("Category", c.parent.name, true)
    .addField("Permission Overwrites", listOverwrites(c));
    c.send(embed);
  }
  else {
    if (args[0] === "name") {
      args.shift();
      var name = args.join("-");
      if (args[1] === undefined) {
        c.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`The name of the channel is currently **${c.name}**`));
      }
      else if (!msg.member.hasPermission("MANAGE_CHANNELS")) {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ You don't have permission to access this command!"));
      }
      else if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ Aoba doesn't have permission to access this command!"));
      }
      else {
        c.setName(name).then(c => {msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Channel name has been changed!"))}).catch(error => {console.error(error)});
      }
    }
    else if (args[0] === "topic") {
      args.shift();
      var topic = args.join(" ");
      if (args[1] === undefined) {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`❗️ Please enter an argument to change the topic to`));
      }
      else if (!msg.member.hasPermission("MANAGE_CHANNELS")) {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ You don't have permission to access this command!"));
      }
      else if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) {
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`❗️ Aoba doesn't have permission to access this command!`));
      }
      else {
        c.setTopic(topic).then(c => {msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Topic has been changed!"))}).catch(error => {console.error(error)});
      }
    }
    else {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Not a valid command!"));
    }
  }
}