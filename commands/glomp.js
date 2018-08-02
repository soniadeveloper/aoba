exports.run = (client, msg, args) => {
  var list = msg.mentions.members;
  if (list.first() === null || list.first() === undefined) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ Please list a user to glomp!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else if (list.first().user.bot) {
    return;
  }
  else if (list.firstKey() === msg.author.id) {
    msg.channel.send({embed: {
            color: client.color,
            description: "❗️ You can't glomp yourself!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    var sender = msg.author.id;
    var receiver = list.firstKey(1);
    var urls = ["https://78.media.tumblr.com/f5a6fdd6e8ee0a217214e1a0113b139e/tumblr_o68qf2OAKH1ultad9o1_500.gif",
               "https://78.media.tumblr.com/74f23b986973003140ae6928273f05df/tumblr_n10cx1vgc11tnpntdo1_500.gif",
               "https://78.media.tumblr.com/f198e84208cf44ad7ea565d2ce20934d/tumblr_n10cx1vgc11tnpntdo5_400.gif",
               "https://78.media.tumblr.com/9c385641ed8fe2067fc4e3493d11dbb8/tumblr_oy6q5tqA2W1ql0375o1_540.gif"];
    var choice = Math.floor(Math.random() * urls.length);
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setImage(urls[choice]).setDescription(`<@${sender}> has glomped <@${receiver}>!\nლ(=ↀωↀ=)ლ`));
  }
}