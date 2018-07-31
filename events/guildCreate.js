module.exports = (client, guild) => {
  if(guild.available){
    client.prefixes.set(guild.id, process.env.PREFIX);
    let channelList = guild.channels.findAll("type", "text");
    var defaultChannel;
    var i = 0;
    while (defaultChannel === undefined) {
      if (channelList[i].permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channelList[i];
      }
      i += 1;
    }
    console.log(defaultChannel.name);
    console.log(`**New guild joined:** ${guild.name}`);
    var url = "https://78.media.tumblr.com/6a3861b9589ec3670c516466b8f0fed6/tumblr_olfus8py1U1twgfw0o1_540.gif";
    var embed = new client.discord.RichEmbed().setColor(0xffa3e7).setDescription("Hello~! I am **Aoba**, your local game designing bot! Say `>help` or `@Aoba help` to get a list of commands!").setImage(url);
    defaultChannel.send(embed).catch(err => {console.error(err);});
    console.log(`In channel ${defaultChannel.name}`);
  }  
}
