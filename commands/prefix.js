exports.run = (client, msg, args) => {
  if (!msg.member.hasPermission("ADMINISTRATOR")) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color)
                     .setDescription("❗️You don't have permission to use this command! Only the administrator can use this command.")).then(msg => { msg.delete(3000)}).catch(err => {console.error(err)});
  }
  else {
    if (args.length === 0) {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color)
                     .setDescription("❗️Please provide a prefix!")).then(msg => { msg.delete(3000)}).catch(err => {console.error(err)});
    }
    else {
      client.prefixes.set(msg.guild.id, args.join(" "));
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Prefix is set to ${client.prefixes.get(msg.guild.id)}`)).catch(err => {console.error(err)});
    }
  }
}