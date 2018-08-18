module.exports = { name: "lenny", run(client, msg, args) {
  //sends the lenny face
  msg.channel.send(
    new client.discord.RichEmbed().setColor(client.color).setDescription("( ͡° ͜ʖ ͡°)")
  );
},}