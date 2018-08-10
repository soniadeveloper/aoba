module.exports = { name: "music", async run(client, msg, args) {
  var vc = msg.member.voiceChannel;
  const sq = client.q.get(msg.guild.id);
  var canSpeak = msg.guild.me.hasPermission("SPEAK");
  if (args[0] === "help") {
    var embed = new client.discord.RichEmbed().setColor(client.color).setTitle("Music Help")
        .addField("`play [url or search term]`", "Plays the given song")
        .addField("`queue`", "View the queue")
        .addField("`np`", "View the song that is currently playing")
        .addField("`volume [number]`", "Change the volume (suggested volume between 2-7)")
        .addField("`pause`", "Pause the playing song")
        .addField("`resume`", "Resume the paused song")
        .addField("`skip`", "Skip the current song")
        .addField("`stop`", "Stops the music player");
    msg.channel.send(embed);
  }
  else if (vc === undefined) {
    msg.channel.send({embed: {
      color: client.color,
      description: "❗️ Please enter a voice channel first!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else if (!vc.speakable || !canSpeak) {
    msg.channel.send({embed: {
      color: client.color,
      description: "❗️ Aoba does not have permission to speak in this voice channel!"
    }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  else {
    switch (args[0]) {
      case "play":
        const arg = args;
        var url = arg[1].replace(/<(.+)>/g, "$1");
        args.shift();
        var search = args.join(" ");
        if (url === undefined) {
          msg.channel.send({embed: {
            color: client.color,
            description: "❗️ Please enter a valid YouTube url!"
          }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
        }
        else {
          try {
            var vid = await client.y.getVideo(url);
          }
          catch (error) {
            try {
              var vids = await client.y.searchVideos(search, 1);
              var vid = await client.y.getVideoByID(vids[0].id);
            }
            catch (err) {
              console.error(err);
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Could not find video!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
            }
          }
          //const songinfo = await client.yt.getInfo(url);
          const song = {
            id: vid.id,
            title: vid.title,
            url: `https://www.youtube.com/watch?v=${vid.id}`
          };
          if (sq === undefined) {
            const qconstruct = {
              txt: msg.channel,
              voice: vc,
              connection: null,
              songs: [],
              volume: 5,
              playing: true
            };
            client.q.set(msg.guild.id, qconstruct);
            qconstruct.songs.push(song);
            try {
              var connect = await vc.join();
              qconstruct.connection = connect;
              play(msg.guild, qconstruct.songs[0]);
            }
            catch (error) {
              console.error(error);
              client.q.delete(msg.guild.id);
              return 
              msg.channel.send({embed: {
                color: client.color,
                description: "❗️ There was an error connecting to the voice channel."
              }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
            }
          }
          else {
            sq.songs.push(song);
            return msg.channel.send({embed: {
              color: client.color,
              description: `✅ \`${song.title}\` has been added to the queue.`
            }});
          }
        }
        break;
      case "queue":
        function makeQueue() {
          var txt = "";
          var q = client.q.get(msg.guild.id).songs;
          for (var i = 0; i < q.length; i++) {
            txt += `**${i+1}:** \`${q[i].title}\`\n`; 
          }
          if (txt === "") {
            return "`Queue is empty`";
          }
          return txt;
        }
        msg.channel.send({embed: {
          color: client.color,
          title: `${msg.guild.name}'s queue`,
          description: makeQueue()
        }});
        break;
      case "np":
        var curr = client.q.get(msg.guild.id).songs[0].title;
        msg.channel.send({embed: {
          color: client.color,
          description: `Now playing: \`${curr}\``
        }});
        break;
      case "volume":
        if (!sq)
        return msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ There is nothing playing!"))
        .then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
        else {
          if (args[1] === undefined) {
            return msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`🔈 The current volume is \`${sq.volume}\``));
          }
          else {
            if (isNaN(args[1])) {
              return msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ Please enter a valid number!"))
                .then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
            }
            else if (parseInt(args[1]) > 10) {
              msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️ Please enter number less than 10!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
            }
            else {
              sq.volume = args[1]
              sq.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
              return msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(`🔈 The volume has been set to \`${sq.volume}\``));
            }
          }
        }
        break;
      case "pause":
        if (!sq || !sq.playing) {
          var embed = new client.discord.RichEmbed().setColor(client.color).setDescription("❗️There is nothing playing!");
          msg.channel.send(embed).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
        }
        else {
          sq.playing = false;
          sq.connection.dispatcher.pause();
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("⏸ Music has been paused!"));
        }
        break;
      case "resume":
        if (!sq) {
          var embed = new client.discord.RichEmbed().setColor(client.color).setDescription("❗️There is nothing playing!");
          msg.channel.send(embed).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
        }
        else if (client.q.playing) {
          var embed = new client.discord.RichEmbed().setColor(client.color).setDescription("❗️There is music already playing!");
          msg.channel.send(embed).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
        }
        else {
          sq.playing = true;
          sq.connection.dispatcher.resume();
          msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("▶️ Music has been resumed!"));
        }
        break;
      case "skip":
        if (!sq) {
          var embed = new client.discord.RichEmbed().setColor(client.color).setDescription("❗️There is nothing to skip!");
          msg.channel.send(embed).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
        }
        else {
          var name = sq.songs[0].title;
          sq.connection.dispatcher.end();
          var embed = new client.discord.RichEmbed().setColor(client.color).setDescription(`⏩ \`${name}\` has been skipped`);
          msg.channel.send(embed);
        }
        break;
      case "stop":
        if (!sq) {
          var embed = new client.discord.RichEmbed().setColor(client.color).setDescription("❗️There are no songs playing!");
          msg.channel.send(embed).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
        }
        else {
          sq.songs = [];
          sq.connection.dispatcher.end();
          var embed = new client.discord.RichEmbed().setColor(client.color).setDescription("⏹ Music has been stopped");
          msg.channel.send(embed);
        }
        break;
      case "help":
        var embed = new client.discord.RichEmbed().setColor(client.color).setTitle("Music Help")
        .addField("`play [url or search term]`", "Plays the given song")
        .addField("`queue`", "View the queue")
        .addField("`np`", "View the song that is currently playing")
        .addField("`volume [number]`", "Change the volume (suggested volume between 2-7)")
        .addField("`pause`", "Pause the playing song")
        .addField("`resume`", "Resume the paused song")
        .addField("`skip`", "Skip the current song")
        .addField("`stop`", "Stops the music player");
        msg.channel.send(embed);
        break
      default:
        msg.channel.send({embed: {
          color: client.color,
          description: "Please be patient as I implement more commands"
        }});
        break;
    }

    function play(guild, song) {
        const sq = client.q.get(guild.id);
        if (!song) {
          vc.leave();
          client.q.delete(guild.id);
          return;
        }
        const dispatcher = sq.connection.playStream(client.yt(song.url)) 
        .on("end", () => {
          sq.songs.shift();
          play(guild, sq.songs[0]);
        })
        .on("error", error => {
          console.error(error);
          msg.channel.send({embed: {
            color: client.color,
            description: "❗️ There was an error playing the video."
          }}).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
        });
        dispatcher.setVolumeLogarithmic(5 / 5);
      return msg.channel.send({embed: {
        color: client.color,
        description: `🎶 Now playing: \`${song.title}\``
      }});
    }
  }
},}
