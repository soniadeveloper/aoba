exports.run = (client, msg, args) => {
  let txt = args.slice(0).join(" ");
  msg.channel.send(txt).catch(err => {console.error(err)});
}
