module.exports = { name: "gottem", run(client, msg, args) {
  var embed = `${client.emojis.get("462385338673922048")}`;
  msg.delete().catch(console.error);
  if (msg.mentions.members.first() !== undefined) {
    msg.channel.send(`<@${msg.mentions.members.firstKey(1)}>`)
      .then(msg => {msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(embed));})
    .catch(console.error);
  }
  else if (msg.mentions.everyone === true) {
    if (msg.content.indexOf(`@here`) > -1) {
      msg.channel.send(`@here`).then(msg => {msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(embed));})
      .catch(console.error);
    }
    else {
      msg.channel.send(`@everyone`).then(msg => {msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(embed));})
      .catch(console.error);
    }
  }
  else {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(embed));
  }
},}