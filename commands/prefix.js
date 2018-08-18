module.exports = { name: "prefix", run(client, msg, args) {
  //change server prefix
  if (!msg.member.hasPermission("ADMINISTRATOR")) { //if user is not an administrator
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color)
                     .setDescription("❗️You don't have permission to use this command! Only the administrator can use this command.")).then(msg => {msg.delete(3000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    if (args.length === 0) {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`Prefix is currently set to ${client.prefixes.get(msg.guild.id)}. Use \`${client.prefixes.get(msg.guild.id)}prefix [desired prefix]\` to chage the prefix`));
    }
    else {
      client.prefixes.set(msg.guild.id, args.join(" "));
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Prefix is set to ${client.prefixes.get(msg.guild.id)}`));
    }
  }
},}