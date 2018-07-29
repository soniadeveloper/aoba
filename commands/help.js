exports.run = (client, msg, args) => {
  let prefixes = JSON.parse(client.fs.readFileSync("./prefixes.json", "utf8"));
  if (!prefixes[msg.guild.id]) {
    prefixes[msg.guild.id] = {
      prefixes: process.env.PREFIX
    };
  }
  let prefix = prefixes[msg.guild.id].prefixes;
  function genText(arg, desc) {
      var embed = new client.discord.RichEmbed().setColor(client.color).setTitle(`❔Help: ${args[0]} ${client.emojis.get("472556462363770900")}`).addField("Arguments", arg).addField("Description", desc);
      return msg.channel.send(embed);
    }
 if (args.length == 0) {
   msg.channel.send({embed: {
    color: client.color,
    title: `\`❔Help\` ${client.emojis.get("472556462363770900")}`,
    description: `Here is a list of things I can do! Use \`help (command)\` for help with a specific command.\nServer prefix is set to \`${prefix}\``,
    fields: [
      {
        name: "Core",
        value: "`help` `info`"
      },
      {
        name: "Moderation",
        value: "`autorole` `ban ` `blacklist` `channel` `emoji` `kick` `prefix` `prune` `selfrole` `server` `unban`"
      },
      {
        name: "Utility",
        value: "`flipcoin` `invite` `join` `leave` `notes` `parrot/parrotd`"
      },
      {
        name: "Fairies Story (`fairiesstory or fs`)",
        value: `Use the command \`${prefix}fairiesstory or fs help\` to get all the commands for Fairies Story!`
      },
      {
        name: "Music (`music`)",
        value: `Use the command \`${prefix}music help\` to get all the commands for playing music!`
      },
      {
        name: "Fun",
        value: "`8ball` `amigay` `aoba` `bde` `cookie` `f` `futchscale` `kinme` `kmk` `love` `lenny` `seragaki` `spongebob` `twunkscale` `vine` `weenie` `who`"
      },
      {
        name: "Action",
        value:"`bite` `hug` `kiss` `pat` `slap`"
      },
      {
        name: "NSFW",
        value: "`fmk` `position` `rule34`"
      }
  ],
  footer: {
    text: "This bot is a WIP and more commands will be added in the future!"
  }
  }});
 }
  else if (args.length == 1) {
    console.log("show specific commands");
    switch (args[0]) {
      case "info":
        console.log("info");
        genText("None", "Sends information about the bot");
        break;
      case "autorole":
        genText("role", "Sets the given role to be automatically assigned to new members.\nEnter ON or OFF instead of a role in order to either turn autorole on or off\n\nThis command requires the **Manage roles** permission");
        break;
      case "ban":
        genText("user (mention), \"reason (optional)\"", `Bans the specified user.\n\nThis command requires the **Ban members** permission.\n\nExample: \`${prefix}ban @urmom "because i hate her"\``);
        break;
      case "blacklist":
        genText("delete [word] (optional), word (optional)", `Allows user to view the blacklisted words in the server.\nUse \`${prefix}blacklist [word]\` to add a word to the blacklist and \`${prefix}blacklist delete [word]\` to remove a word from the blacklist.\n\nThis command requires the **Manage server** permission`);
        break;
      case "emoji":
        genText("image url, name", `Allows user to create an emoji by providing an image URL and a name (must have no spaces).\nUse \`${prefix}emoji delete [name]\` to delete an emoji.\nThis command requires the **Manage emojis** permission`);
        break;
      case "kick":
        genText("user (mention), \"reason (optional)\"", `Kicks the specified user\n\nThis command requires the **Kick members** permission.\n\nExample: \`${prefix}kick @urmom "because i can"\``);
        break;
      case "8ball":
        genText("prompt", `Dear, Magic 8-ball...\n\nExample: \`${prefix}8ball will i be rich and famous someday?\``);
        break;
      case "aoba":
        genText("None", "Sends a GIF of yours truly uwu");
        break;
      case "amigay":
        genText("None", "Are you gay?");
        break;
      case "bde":
        genText("name (optional)", "Calculates your BDE");
        break;
      case "cookie":
        genText("user (mention)", "Give a user a cookie!");
        break;
      case "f":
        genText("None", "Press F to pay respects");
        break;
      case "flipcoin":
        genText("None", "Self-explanatory: flip a coin!");
        break;
      case "fmk":
        genText("name, name, name", `Play FMK with the bot!\n**Note:** This command can only be used in NSFW channels\n\nExample: \`${prefix}fmk evans pratt hemsworth\``);
        break;
      case "futchscale":
        genText("name (optional)", "See where you land on the Futch Scale™");
        break;
      case "hug":
        genText("name (mention)", "Give a user a hug!");
        break;
      case "invite":
        genText("None", "Sends an invite link so you can bring Aoba to other servers!");
        break;
      case "kinme":
        genText("None", "Leave it to Aoba to assign you a kin~");
        break;
      case "kmk":
        genText("name, name, name", `Play a game of Kiss, Marry, Kill with the bot!\n\nExample: \`${prefix}kmk evans pratt hemsworth\``);
        break;
      case "love":
        genText("name, name", "Calculates the compatibility of two people");
        break;
      case "parrot":
        genText("phrase", "Copies the given message");
        break;
      case "parrotd":
        genText("phrase", "Copies and deletes the given message");
        break;
      case "position":
        genText("None", "Sees if you're a top, bottom, or verse.\n**Note:** This command can only be used in NSFW channels.");
        break;
      case "prune":
        genText("number", "Deletes a given amount of messages from the channel.\nThis command requires the **Manage messages** permission.");
        break;
      case "seragaki":
        genText("None", "😒");
        break;
      case "spongebob":
        genText("None", "Sends a randomly generated Spongebob quote");
        break;
      case "twunkscale":
        genText("name (optional)", "Check where you fall on the Twunk Scale™");
        break;
      case "unban":
        genText("user (mention), \"reason (optional)\"", `Unbans the given user from the server\n\nThis command requires the **Ban members** permission\n\nExample: \`${prefix}unban @urmom "she's ok i guess"\``);
        break;
      case "vine":
        genText("None", "Randomly generates a Vine.");
        break;
      case "weenie":
        genText("none", "Calculates the size of your weenie ;)");
        break;
      case "who":
        genText("prompt", `Ask a question starting with 'who' and Aoba will answer with a member in your guild\n\nExample: \`${prefix}who is the most attractive\``);
        break;
      case "server":
        genText("role name (optional)", `Shows information about the server. Use \`${prefix}server roles\` to show a list of roles and \`${prefix}server roles [role name]\` to view information about a specific role\nUse \`${prefix}server name [name]\` and \`${prefix}server icon [icon url]\` to change the name or icon of the server. (Requires the **Manage server** permission)`);
        break;
      case "channel":
        genText("name (optional), topic (optional)", `Allows you to view information about the current channel. Use \`${prefix}channel name [name]\` to change the name of the channel and \`${prefix}channel topic [topic]\` to change the topic. (Requires the **Manage channels** permission)`);
        break;
      case "notes":
        genText("add \"[note]\" (optional), delete [number or \"all\"] (optional)", `Allows you to view, create, and delete notes.\nExamples: \`${prefix}notes add "buy groceries"\`\n\`${prefix}notes delete 1\``);
        break;
      case "selfrole":
        genText("add [role] (optional), delte [role], role name", `Lets you view a list of self-assignable roles as well as assign yourself a role.\nUse \`${prefix}selfrole [role name]\` to assign yourself a listed role.\nUse \`${prefix}selfrole add\\delete [role name]\` to add or delete a role from the selfrole list. (Requires the **Manage roles** permission)\nExamples: \`${prefix}selfrole add User\`\n\`${prefix}selfrole User\``);
        break;
      case "lenny":
        genText("None", "( ͡° ͜ʖ ͡°)");
        break;
      case "rule34":
        genText("search term", "Alias: r34\nSee if there is p*rn of anything by searching images on Rule34.xxx. This command can only be used in channels marked as NSFW.");
        break;
      case "prefix":
        genText("desired prefix", `Change Aoba's prefix in your server.\nThis command requires **Administrator** privileges.\nExample: \`${prefix}prefix a!\``);
        break;
      case "join":
        genText("none", "Causes Aoba to join the voice channel you are in. You must be in a voice channel in order to use this command.");
        break;
      case "leave":
        genText("none", "Causes Aoba to leave the voice channel you are in.");
        break;
      case "bite":
        genText("name (mention)", "Bite someone!");
        break;
      case "kiss":
        genText("name (mention)", "Give a user a kiss!");
        break;
      case "pat":
        genText("name (mention)", "Give a user a pat on the head!");
        break;
      case "slap":
        genText("name (mention)", "Slap someone!");
        break;
    }
  }
  else {
    msg.channel.send({embed: {
      color: client.color,
      description: "❗️Too many arguments!"
    }}).then(msg => {msg.delete(2000)});
  }
}
