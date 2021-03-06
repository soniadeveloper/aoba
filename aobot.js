// server.js
// where your node app starts

// init project
const Discord = require("discord.js");
const opus = require("node-opus");
const client = new Discord.Client();
const http = require('http');
const express = require('express');
var bodyParser = require('body-parser');
const Grapheme = require("grapheme-splitter");
const app = express();

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/", (request, response) => {
  console.log("sending request");
  response.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
const fs = require('fs');
const dbFile = './.data/aoba.sqlite';
const exists = fs.existsSync(dbFile);
const sqlite = require('sqlite');
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const Kaori = require("kaori");
const dbl = require("dblapi.js");
const kaori = new Kaori();
const YT = new Youtube(process.env.GOOGLE_API_KEY);
const color = 0xffa3e7;
const q = new Map();
const splitter = new Grapheme();
const tableSource = new EnmapLevel({name: "notes"});
const notes = new Enmap({provider: tableSource});
const tblSrc = new EnmapLevel({name: "prefixes"});
const prefixes = new Enmap({provider: tblSrc});
client.notes = notes;
client.prefixes = prefixes;
client.splitter = splitter;
client.fs = fs;
client.kaori = kaori;
client.q = q;
client.sql = sqlite;
client.discord = Discord;
client.sql.open(dbFile);
client.color = color;
client.yt = ytdl;
client.y = YT;
client.dbl = dbl;
const embed = new client.discord.RichEmbed().setColor(client.color);
client.embed = embed;
const items = ["🐶 Annoying Dog",
               "⚖️ Attorney Badge",
               "🍾 Bottle of Liquor",
               "🍰 Butts Pie",
               "💎 Chaos Emerald",
               "🔖 Cleanse Tag",
               "🧠 Deer Brain",
               "🐾 Dog Residue",
               "🔑 Golden Key",
               "👨 Handsome Boyfriend",
               "👫 Heterosexual Couple",
               "🌭 Hot Dog...?",
               "🥛 LonLon Milk",
               "🍯 Max Elixir",
               "👶 Newborn Infant",    
               "🎲 Rainbow D20",
               "💍 Shiny Ring",
               "🎐 Soothe Bell", 
               "🍄 Spotted Mushroom",
               "🥃 Super Potion",
               "🔪 Toy Knife",
              "🍎 Yummy Food",];
client.items = items;
const cooldown = new Map();
const cdseconds = 5;
client.cd = cooldown;
client.sec = cdseconds;

fs.readdir("events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0]; //get event name
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.login(process.env.SECRET);