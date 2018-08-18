module.exports = { name: "parrot", run(client, msg, args) {
  //repeats the given text
  let txt = args.slice(0).join(" ");
  msg.channel.send(txt);
},}
