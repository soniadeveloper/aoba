module.exports = { name: "seragaki", run(client, msg, args) {
  msg.channel.send({embed: {
    color: client.color,
    description: "Stop saying my name is like Aoba Seragaki's. He's dumb and he's a coward and I am **not** a coward!"
  }});
},}