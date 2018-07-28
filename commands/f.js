exports.run = (client, msg, args) => {
  msg.channel.send({embed: {
    color: client.color,
    description: "**" + msg.member.displayName + "** has paid their respects. (⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ"
  }});
}
