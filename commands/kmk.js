module.exports = { name: "kmk", run(client, msg, args) {
  //kiss marry kill
  if (args.length != 3) {
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ Must provide three names!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
    }
    else {
      function shuffle(arr) { //shuffles the array
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
},}