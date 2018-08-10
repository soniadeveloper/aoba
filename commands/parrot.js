module.exports = { name: "parrot", run(client, msg, args) {
  let txt = args.slice(0).join(" ");
  msg.channel.send(txt);
},}
