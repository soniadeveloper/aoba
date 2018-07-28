exports.run = (client, msg, args) => {
  msg.channel.send(
    new client.discord.RichEmbed().setColor(client.color).setDescription("( ͡° ͜ʖ ͡°)")
  );
}