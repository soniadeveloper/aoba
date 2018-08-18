module.exports = { name: "channel", run(client, msg, args) {
  var c = msg.channel;
  function listOverwrites(c) {
    var list = "";
    var overwrites = c.permissionOverwrites.array()
    for (var i = 0; i < overwrites.length; i++) {
      if (overwrites[i].type === "role") { //if the overwrite is for a role
        list += `‣ ${msg.guild.roles.get(overwrites[i].id)}\n`;
      }
      else { //if it's for a user
        list += `‣ ${msg.guild.members.get(overwrites[i].id)}\n`;
      }
    }
    if (list === "") {
      return "None";
    }
    else {
      return list;
    }
  }
  if (args.length == 0) { //returns channel info
    var embed = new client.discord.RichEmbed().setColor(client.color).setTitle(`\`${c.name}\``)
    .addField("ID", c.id, true)
    .addField("Date Created", c.createdAt)
    .addField("Type", c.type, true)
    .addField("Category", c.parent.name, true)
    .addField("Permission Overwrites", listOverwrites(c));
    c.send(embed);
  }
  else {
    if (args[0] === "name") { //if the argument given is name
      args.shift();
      var name = args.join("-"); //channel names can't have spaces
      if (args[1] === undefined) { //returns name of channel
        c.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`The name of the channel is currently **${c.name}**`));
      }
      else if (!msg.member.hasPermission("MANAGE_CHANNELS")) { //if user does not have permission
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ You don't have permission to access this command!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      }
      else if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) { //if aoba does not have permission
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ Aoba doesn't have permission to access this command! Please grant Aoba the **Manage channels** permission")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      }
      else { //changes channel name
        c.setName(name).then(c => {msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Channel name has been changed!"))}).catch(console.error);
      }
    }
    else if (args[0] === "topic") { //if argument given is topic
      args.shift();
      var topic = args.join(" ");
      if (args[1] === undefined) { //if no topic is given
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`❗️ Please enter an argument to change the topic to`)).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      }
      else if (!msg.member.hasPermission("MANAGE_CHANNELS")) { //if user does not have permission
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ You don't have permission to access this command!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      }
      else if (!msg.guild.me.hasPermission("MANAGE_CHANNELS")) { //if aoba does not have permission
        msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`❗️ Aoba doesn't have permission to access this command! Please grant Aoba the **Manage channels** permission`)).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      }
      else { //changes channel topic
        c.setTopic(topic).then(c => {msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("✅ Topic has been changed!"))}).catch(console.error);
      }
    }
    else { //general error
      msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Not a valid command!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
    }
  }
},}