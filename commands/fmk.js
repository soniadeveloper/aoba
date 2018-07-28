exports.run = (client, msg, args) => {
  if (!msg.channel.nsfw) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("🔞 This command can only be used in channels marked as **NSFW**!")).then(msg => {msg.delete(5000)});
  }
  else {
    if (args.length != 3) {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("⚠️ Must provide three names!")).then(msg => {msg.delete(5000)});
    }
    else {
      function shuffle(arr) {
        var current = arr.length, temp, random;
        
        while (0 !== current) {
          random = Math.floor(Math.random() * current);
          current -= 1;
          
          temp = arr[current];
          arr[current] = arr[random];
          arr[random] = temp;
        }
        return arr;
      }
      
      var results = shuffle(args);
      let embed = new client.discord.RichEmbed().setColor(client.color).setTitle("🔞 Fuck, Marry, Kill 🔞").setDescription(`😳 **Fuck:** ${results[0]}\n\n👰 **Marry:** ${results[1]}\n\n🔪 **Kill:** ${results[2]}`);
      msg.channel.send(embed);
    }
  }
}