module.exports = { name: "8ball", run(client, msg, args) {
  const id = "474613910511812608"; //emoji id
  if (args.length === 0){ //if no question is asked
    return msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Please ask a question")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  let txt = args.join(" ");
  console.log(`${msg.author.username} asked: ${txt}`); //some people ask weird/not good questions :( so i wanna moderate what questions are being asked
  var options = ["Yes.", "No.", "Maybe?", "Absolutely!", "Absolutely not.", "I'm too tired, try asking later", "I don't really care", `${client.emojis.get(id)}`]; //list of responses
  var num;
  if (txt === "whill i ever get married to a foxie lady") { //a little easter egg ;)
    num = options.length - 1;
  }
  else { //if any other question is asked
    num = Math.floor((Math.random() * options.length));
  }
  msg.channel.send({embed: {
        color: client.color,
        description: `🎱**Magic 8-ball says:** ${options[num]}`  
    }}); //send message
},}
