exports.run = (client, msg, args) => {
  var side = Math.floor(Math.random() * 2);
  var result;
  if (side == 0) {
    result = "heads";
  }
  else {
    result = "tails";
  }
  msg.channel.send({embed: {
      color: client.color,
      description: `The coin landed on **${result}**!`
  }});
}
