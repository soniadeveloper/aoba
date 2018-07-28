exports.run = (client, msg, args) => {
  if (!msg.member.hasPermission("ADMINISTRATOR")) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color)
                     .setDescription("❗️You don't have permission to use this command! Only the administrator can use this command.")).then(msg => { msg.delete(3000)});
  }
  else {
    if (args.length === 0) {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color)
                     .setDescription("❗️Please provide a prefix!")).then(msg => { msg.delete(3000)});
    }
    else {
     let prefixes = JSON.parse(client.fs.readFileSync("./prefixes.json", "utf8"));
      prefixes[msg.guild.id] = {
        prefixes: args.join(" ")
      };
      client.fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) {
          console.error(err);
        }
      });
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`✅ Prefix is set to ${args.join(" ")}`));
    }
  }
}