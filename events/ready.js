module.exports = (client) => {
  console.log("Logged in as " + client.user.tag + "!");
  client.user.setActivity("Fairies Story 3 (>help)");
  setInterval(() => {
    client.dbl.postStats(client.guilds.size);
  }, 1800000);
}
