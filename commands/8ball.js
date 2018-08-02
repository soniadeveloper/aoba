exports.run = (client, msg, args) => {
  const id = "474613910511812608";
  if (args.length === 0){
    return msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Please ask a question")).then(msg => {msg.delete(2000)}).catch(console.error);
  }
  let txt = args.join(" ");
  console.log(`${msg.author.username} asked: ${txt}`);
  var options = ["Yes.", "No.", "Maybe?", "Absolutely!", "Absolutely not.", "I'm too tired, try asking later", "I don't really care", `${client.emojis.get(id)}`];
  var num;
  if (txt === "whill i ever get married to a foxie lady") {
    num = options.length - 1;
  }
  else {
    num = Math.floor((Math.random() * options.length));
  }
  msg.channel.send({embed: {
        color: client.color,
        description: `🎱**Magic 8-ball says:** ${options[num]}`  
    }});
}
