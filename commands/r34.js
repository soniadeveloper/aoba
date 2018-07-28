exports.run = (client, msg, args) => {
  if (!msg.channel.nsfw) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("🔞 This command can only be used in channels marked as **NSFW**!")).then(msg => {msg.delete(5000)});
  }
  else {
    var search = args.join(" ");
    if (args.length == 0) {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ Please provide a search term!"))
        .then(msg => {msg.delete(3000)});
    }
    else {
      client.kaori.search('r34', {tags: args, limit: 1, random: true})
      .then(images => {
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color)
                           .setTitle("🔞 Rule 34 Search")
                           .setImage(images[0].common.fileURL)
                           .setDescription(`Search terms: \`${search}\``));
        }).catch(err => {
          console.error(err);
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ Could not find images with that search term!"))
        .then(msg => {msg.delete(3000)});
      });
    }
  }
}