exports.run = (client, msg, args) => {
  if (args.length != 3) {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("⚠️ Must provide three names!")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
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
      
      let embed = new client.discord.RichEmbed().setColor(client.color).setTitle("💗 Kiss, Marry, Kill 💗").setDescription(`😘 **Kiss:** ${results[0]}\n\n**👰 Marry:** ${results[1]}\n\n🔪 **Kill:** ${results[2]}`);
      msg.channel.send(embed);
    }
}