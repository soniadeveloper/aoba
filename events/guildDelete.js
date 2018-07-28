module.exports = (client, guild) => {
  if(guild.available){
    console.log(`**Removed from guild:** ${guild.name}`);
  }  
}
