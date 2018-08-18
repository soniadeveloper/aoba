module.exports = { name: "parrotd", run(client, msg, args) {
  //repeats the given text and deletes the original method
  let txt = args.slice(0).join(" ");
  msg.delete().then(msg => {msg.channel.send(txt); console.log(`Deleted message from ${msg.author.username}`)}).catch(console.error);
},}
