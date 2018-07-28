exports.run = (client, msg, args) => {
  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setImage("https://cdn.discordapp.com/attachments/468522702139949056/472605481718775848/unknown.png"));
}