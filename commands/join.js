exports.run = (client, msg, args) => {
  var vc = msg.member.voiceChannel;
  if (vc === undefined) {
    msg.channel.send({embed: {
      color: client.color,
      description: "❗️ Please enter a voice channel first!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    if (vc.full) {
      msg.channel.send({embed: {
        color: client.color,
        description: "❗️ This voice channel is full!"
      }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
    }
    else if (!vc.joinable) {
      msg.channel.send({embed: {
        color: client.color,
        description: "❗️ Aoba doesn't have permission to enter this voice channel!"
      }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
    }
    else {
      vc.join().then(connection => {
        console.log(`Connected to voice channel ${vc.name}`);
        msg.channel.send({embed: {
          color: client.color,
          description: `🎶 Entered voice channel ${vc.name}.`
        }});
      }).catch(() => {
        msg.channel.send({embed: {
          color: client.color,
          description: "❗️ There was an error entering the voice channel!"
        }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      });
    }
  }
}
