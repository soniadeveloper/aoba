exports.run = (client, msg, args) => {
  var imgs = ["https://78.media.tumblr.com/407953bd0d867716869aa447af1b0212/tumblr_oa7w2cXrks1twgfw0o1_540.gif", 
              "https://78.media.tumblr.com/b0dde3d5f5763a0d8a72455b5ee681bc/tumblr_omexn3ThLT1s3wq70o1_540.gif", 
              "https://78.media.tumblr.com/399259fe9dcae09a36f7ee4d35f7b514/tumblr_okt2l5Khy31tydz8to1_540.gif",
              "https://78.media.tumblr.com/3cd1d6b9b4829ab1a987d33dbe0412e1/tumblr_oya5vu0klc1tydz8to1_540.gif",
              "https://78.media.tumblr.com/df520267708b9521153e1144e3924e8e/tumblr_ofcc5nEqxo1tydz8to3_540.gif",
              "https://78.media.tumblr.com/db72c44f6281e6e86b072baf7205afd0/tumblr_ougbtmZK6D1tw58h4o1_r1_540.gif",
             "https://78.media.tumblr.com/1acd75301a5a1f3724ac6bf8c6702217/tumblr_oxntlaZRbO1tydz8to1_540.gif",
             "https://78.media.tumblr.com/f341bf1206fcab4ca7c065c8f7446227/tumblr_oxptzytPvs1tydz8to1_540.gif",
             "https://78.media.tumblr.com/ebec85cc4b9e89902e1e9f657ef8cfb7/tumblr_orvjz841Gt1tw58h4o1_540.gif",
             "https://78.media.tumblr.com/2eb8d2b99a041133cd30b6238707e304/tumblr_om9jlzebUk1tw58h4o1_540.gif"];
  var choice = Math.floor(Math.random() * imgs.length);
  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setImage(imgs[choice]).setDescription(`Hifumi-senpai is also here~! 💖${client.emojis.get("472564534356344834")}`));
}