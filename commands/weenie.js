exports.run = (client, msg, args) => {
  const id = msg.member.id;
  var init = parseInt(id);
  var weenie = Math.round(init / 25000000000000000);
  //dick size should be between 1-15 inches
  msg.channel.send({embed: {
    color: client.color,
    description: `🍆 **${msg.member.displayName}**, your weenie is **` + weenie + " inches** long!"
  }});
}
