exports.run = (client, msg, args) => {
  if (msg.author.id !== process.env.OWNER_ID) return;
  if(!args || args.size < 1) return msg.channel.send({embed: {color: client.color, description: "❗️Must provide a command name to reload."}}).then(msg => {msg.delete(2000)});
  const commandName = args[0];
  // Check if the command exists and is valid
  if(!client.commands.has(commandName)) {
    return msg.channel.send("That command does not exist");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  msg.channel.send({embed: {color: client.color, description: `✅ The command ${commandName} has been reloaded`}}).then(msg => {msg.delete(2000)});
}
