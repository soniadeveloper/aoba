module.exports = { name: "f", run(client, msg, args) { //press f to pay respects
  msg.channel.send({embed: {
    color: client.color,
    description: `**${msg.member.displayName}** has paid their respects.\n(⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ`
  }});
},}
