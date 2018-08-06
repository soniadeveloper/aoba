exports.run = (client, msg, args) => {
  if (args.length == 0) {
    msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Please provide a name!"))
    .then(msg => {msg.delete(2000).then(() => {console.log("send")})
                 .catch(console.error)})
    .catch(console.error);
  }
  else {
    var list = [" they are asexual.", 
                " they are gay.",
                " they are a lesbian.",
                " they are bisexual.",
                " they are heterosexual.",
                " they only brush their teeth once a day.", 
                " their favorite genre of music is alternative rock.", 
                " they are allergic to cats.",
               " they are transgender.",
               " they are nonbinary.",
               " they are genderfluid.",
               " they really like fruits.",
               " they have a secret twin sibling.",
               " they know how to play the drums.",
               " they have freckles on their face.",
               " they have two moms/two dads.",
               " they have a scar on their abdomen",
               " they are questioning their sexuality.",
               " they are afraid of the dark.",
               " they are afraid of clowns.",
               " they like to paint their nails every week."];
    var rand = Math.floor(Math.random() * list.length);
    if (msg.mentions.members.first() !== undefined) {
      if (msg.mentions.members.first().user.bot) return;
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`🤔 My headcanon for **${msg.mentions.members.first().displayName}** is that ${list[rand]}`));
    }
    else {
      var name = args.join(" ");
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`🤔 My headcanon for **${name}** is that ${list[rand]}`));
    }
  }
}