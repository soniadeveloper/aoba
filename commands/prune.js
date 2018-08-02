exports.run = (client, msg, args) => {
  var canManage = msg.member.hasPermission("MANAGE_MESSAGES");
  var channel = msg.channel;
  
  //if sender doesnt have permissions
  if (canManage == false) {
    msg.channel.send({embed: {
      color: client.color,
      description: "❗️ You don't have the permissions to use this command!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  
  //if bot doesn't have permissions
  else if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) {
    msg.channel.send({embed: {
      color: client.color,
      description: "❗️ This bot doesn't have the permissions to use this command! Please give the **Aoba** role permission to **Manage messages**."
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  
  //if both bot and user have permissions
  else {
    //delete general messages
    if (args.length < 1 || (args.length >= 1 && isNaN(parseInt(args[0])))) {
        msg.channel.send({embed: {
          color: client.color,
          description: "❗️ Please specify number of messages to prune."
        }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
    }
    else if (args.length > 1) {
      //delete from a specific user
      if (args.length == 2 && msg.mentions.members != null) {
        var member = msg.mentions.members.first();
        
      }
      else {
        msg.channel.send({embed: {
            color: client.color,
            description: "❗️ Too many arguments!"
          }}).then(msg => {
        msg.delete(4000);
      }).catch(err => {console.error(err)});
      }
    }
    //deletes general messages
    else {
      var limit = parseInt(args[0]);
      if (limit >= 100) {
        msg.channel.send({embed: {
            color: client.color,
            description: "❗️ Please enter a number less than 100!"
          }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      }
      else {
      msg.channel.fetchMessages({limit: (limit+1)})
        .then(msgs => msg.channel.bulkDelete(msgs)
              .then(msgs => { channel.send({embed: {color: client.color,description: `🗑 Deleted **${msgs.size-1}** message(s) from ${channel.name}`}})
                .then(msg => {msg.delete(4000);}).catch(console.error)}).catch(console.error)).catch(console.error);
      }
    }
  }
  //delete messages from certain user
  /*else {
    console.log("someone was mentioned");
    var deleteFrom = msg.mentions.members.firstKey();
    var name = msg.mentions.members.first().displayName;
    var list = msg.channel.fetchMessages();
    var msgList = list.array();
    var count = 0;
    var i = 0;
    while (count < (args[0]+1)) {
      if (msgList[i].author.id === deleteFrom) {
        msgList[i].delete().then(msg => console.log("Deleted message")).catch(console.error);
        count += 1;
      }
    }
    msg.channel.send({embed: {
      color: 0xffa3e7,
      description: `✅ Deleted **${args[0]}** message(s) sent by ${name} from ${msg.channel.name}`
    }});
    }*/
}

