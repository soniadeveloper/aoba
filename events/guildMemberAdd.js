module.exports = (client, member) => {
  /*console.log(`User entering guild ${member.guild.name}: ${member.user.username}`);
  var guild = member.guild;
  var defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"));
  defaultChannel.send({embed: {
    color: 0xffa3e7,
    description: `Welcome to ${member.guild.name}, ${member.user.username}! 💓`
  }}).catch(error => {console.error;});*/
  client.sql.get(`SELECT * FROM auto WHERE guildId = '${member.guild.id}'`).then(row => {
    if (!row) return;
    if (row.onoroff == 1) {
      var role = member.guild.roles.find(r => r.name === row.role);
      member.addRole(role.id).then(console.log("Role has been added!"));
    }
    else return;
  }).catch(error => {console.error;});
}
