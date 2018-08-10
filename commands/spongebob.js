module.exports = { name: "spongebob", run(client, msg, args) {
  const spongebob = client.emojis.get("474617622931963922");
  var quotes = ["**Patrick:** Is mayonnaise an instrument?",
  "**Spongebob:** I'm ugly and I'm proud.",
  "**Caller:** Is this the Krusty Krab?\n**Patrick**: No, this is Patrick.",
  "**Spongebob & Patrick:** \*sees an elephant\* It's a giraffe!",
  "**Narrator:** So much later that the old narrator got tired of waiting and they had to hire a new one.",
  "**Patrick:** Fine, I guess you're gonna miss... *the panty raid*.",
  "**Patrick:** Once there was an ugly barnacle. He was so ugly that everybody died. The end! :D",
  "***MY LEG!***",
  "**Spongebob:** Remember, licking doorknobs is illegal on other planets.",
  "**Blue fish:** Well, maybe we wouldnt be playing so bad if some people didn't try playing with BIG MEATY CLAWS!",
  "**Brown fish:** Rev up those fryers, because I am sure hungry!",
  "**Sandy:** Don't you have to be stupid somewhere else?\n**Patrick:** Not until 4.", "**Plankton:** **F** is for fires that burn down the whole town\n**U** is for uranium bombs!\n**N** is for no survivors-",
  "**Mr. Krabs:** That hat makes you look like a girl.\n**Spongebob:** Am i a pretty girl? uwu",
  "**Spongebob:** Can I be excused for the rest of my life?",
  "**Plankton:** Goodbye everyone, I'll remember you all in therapy.",
  "**Spongebob:** Hey, Patrick!\n**Patrck:** What?\n**Spongebob:** I thought of something funnier than 24.\n**Patrick:** Lemme hear it.\n**Spongebob:**...25"];
  var chance = Math.floor(Math.random() * quotes.length);
  msg.channel.send({embed: {
      color: client.color,
      description: `${spongebob} **Spongebob Quote Generator**\n\n${quotes[chance]}`
  }});
},}
