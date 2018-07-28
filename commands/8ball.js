exports.run = (client, msg, args) => {
  const id = "466608783762653184";
  if (args === null) return;
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
