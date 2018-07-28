exports.run = (client, msg, args) => {
  if (msg.guild.me.voiceChannel === undefined) {
    msg.channel.send({embed: {
      color: client.color,
      description: "❗️ Aoba is not in a voice channel!"
    }}).then(msg => {msg.delete(2000)});
  }
  else {
    msg.guild.me.voiceChannel.leave();
    msg.channel.send({embed: {
      color: client.color,
      description: `↩️ Left voice channel ${msg.guild.me.voiceChannel.name}.`
    }}).then(msg => {msg.delete(4000)});
  }
}
