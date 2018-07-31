exports.run = (client, msg, args) => {
  var owo = args.join(" ").toLowerCase();
  if (args.length === 0) {
    return msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Pwease give a phwase! owo")).then(msg => {msg.delete(2000)}).catch(err => {console.error(err)});
  }
  var i = 0;
  while (i < owo.length) {
    if (owo.charAt(i) === 'o') {
      let first = owo.slice(0, i);
      let second = owo.slice(i+1, owo.length);
      if (i == 0) {
        owo = `owo${second}`;
      }
      else {
        owo = `${first}owo${second}`;
      }
      i += 3;
    }
    else if (owo.charAt(i) === 'u') {
      let first = owo.slice(0, i);
      let second = owo.slice(i+1, owo.length);
      if (i == 0) {
        owo = `uwu${second}`;
      }
      owo = `${first}uwu${second}`;
      i += 3;
    }
    else if (owo.charAt(i) === 'l' || owo.charAt(i) === 'r') {
      let first = owo.slice(0, i);
      let second = owo.slice(i+1, owo.length);
      owo = `${first}w${second}`;
      i += 1;
    }
    else {
      owo = owo;
      i += 1;
    }
  }
  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`${owo} owo`)).catch(err => {console.error(err)});
}