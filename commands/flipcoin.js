module.exports = { name: "flipcoin", run(client, msg, args) {
  var coin = client.emojis.get("476885638352863232");
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
      description: `${coin} The coin landed on **${result}**!`
  }});
},}
