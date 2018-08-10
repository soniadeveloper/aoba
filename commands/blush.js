module.exports = { name: "blush", run(client, msg, args) {
  var user = msg.author.id;
  var imgs = ["https://78.media.tumblr.com/c4da4e14031896e06982b068f2630e20/tumblr_okbrmifEyA1voyry7o1_500.gif",
             "https://78.media.tumblr.com/5f0e91ed39e43de08a9dd2b95601b3b9/tumblr_nzhg6xxGH41umlhoro1_500.gif",
             "https://78.media.tumblr.com/ca97efdce8f0024115ad80328904d81f/tumblr_o3mxj8AtSO1unhj5ro1_500.gif",
             "https://78.media.tumblr.com/17aabdfac3530acf0654311023b1aa4d/tumblr_o9t2ryRSiV1vubb1io1_500.gif",
             "https://media1.tenor.com/images/bb30a7aa560f58ca9a9ac133829b9de2/tenor.gif?itemid=7363038",
             "https://media1.tenor.com/images/9eba52d0506b552b7ef6a1981c0cfcff/tenor.gif?itemid=8680309",
             "https://media1.tenor.com/images/8f76f034ccc458bd09675c0380f59cb7/tenor.gif?itemid=5634589",
             "https://media1.tenor.com/images/f62cae32b30d364bf0a8a1e7432c2ddf/tenor.gif?itemid=10198325"];
  var choice = Math.floor(Math.random() * imgs.length);
  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setImage(imgs[choice]).setDescription(`<@${user}> has blushed!\n(*≧∀≦*)`));
},}