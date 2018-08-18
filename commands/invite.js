module.exports = { name: "invite", run(client, msg, args) {
  //sends an invite link
  msg.channel.send({embed: {
    color: client.color,
    description: "Invite Aoba to a server! 😚 \n[Invite Link](https://discordapp.com/oauth2/authorize?client_id=465934252949897216&permissions=1379200054&scope=bot)"
  }})
},}
