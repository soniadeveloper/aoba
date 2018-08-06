exports.run = (client, msg, args) => {
  var embed = new client.discord.RichEmbed()
  .setColor(client.color)
  .setTitle("About Aoba")
  .setThumbnail(msg.guild.me.user.avatarURL)
  .addField("Creator", client.users.get(process.env.OWNER_ID).tag, true)
  .addField("Version", "1.3.0", true)
  .addField("Currently in", `${client.guilds.array().length} servers`, true)
  .addField("Language", "Discord.js (Node.js) + SQLite", true)
  .addField("Twitter", "[Aoba4Discord](http://twitter.com/Aoba4Discord)", true)
  .addField("Support Server", "[Aoba Support](http://discord.gg/H8u4HTn)", true)
  .addField("Discordbots.org", "[Aoba on Discordbots.org](https://discordbots.org/bot/465934252949897216)", true)
  .addField("Become a Patreon!", "[Patreon](https://www.patreon.com/aobabot)", true)
  .addField("Created on", client.user.createdAt, true);
  msg.channel.send(embed);
}