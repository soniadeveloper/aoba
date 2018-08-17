module.exports = (client, guild) => {
  if(guild.available){
    client.prefixes.set(guild.id, process.env.PREFIX);
    function isTxtChannel(channel) {
      return channel.type === "text";
    }
    let channelList = guild.channels.filter(isTxtChannel).array();
    var defaultChannel;
    var i = 0;
    while (defaultChannel === undefined) {
      if (channelList[i].permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channelList[i];
      }
      i += 1;
    }
    console.log(`**New guild joined:** ${guild.name}`);
    var url = "https://78.media.tumblr.com/6a3861b9589ec3670c516466b8f0fed6/tumblr_olfus8py1U1twgfw0o1_540.gif";
    var embed = new client.discord.RichEmbed().setColor(client.color).setDescription(`Hello~! I am **Aoba**, your local game designing bot! Say \`>help\` or \`@Aoba help\` to get a list of commands! ${client.emojis.get("472564534356344834")}`).setImage(url);
    defaultChannel.send(embed);
  }  
}
