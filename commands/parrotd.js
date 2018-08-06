exports.run = (client, msg, args) => {
  let txt = args.slice(0).join(" ");
  msg.delete().then(msg => {msg.channel.send(txt); console.log(`Deleted message from ${msg.author.username}`)}).catch(console.error);
}
