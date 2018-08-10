module.exports = { name: "homestuck", run(client, msg, args) {
  var stuff = args.join(" ");
  var stufff = (stuff.includes("\"")) ? stuff.split("\"") : stuff.split("“");
  var troll = stufff[0];
  var say = ((stufff[1] !== undefined) && stufff[1].includes("”")) ? stufff[1].slice(0, stufff[1].length - 1) : stufff[1];
  var trollify = {
    text: say,
    colors: ["#a10000", "#a15000", "#a1a100", "#626262", "#416600", "#008141", "#008282", "#005682", "#000056", "#2b0057", "#6a006a", "#77003c"],
    trolls: ["aradia ", "tavros ", "sollux ", "karkat ", "nepeta ", "kanaya ", "terezi ", "vriska ", "equius ", "gamzee ", "eridan ", "feferi "],
    emojis: [client.emojis.get("474269321779085312"), client.emojis.get("474272493885194250"), client.emojis.get("474272569131008011"), client.emojis.get("474272615566016521"), client.emojis.get("473522523053752340"), client.emojis.get("473522662086410252"), client.emojis.get("473522871797547009"), client.emojis.get("473523013829001217"), client.emojis.get("473523126542794752"), client.emojis.get("473523256775802880"), client.emojis.get("473523372739788800"), client.emojis.get("473521320152530952")],
    aradia: function () {
      var i = 0;
      var txt = this.text;
      while (i < txt.length) {
        if (txt.charAt(i) === '.' || txt.charAt(i) === ','|| txt.charAt(i) === '\'' || txt.charAt(i) === '?' || txt.charAt(i) === '!') {
          //cut out punctuation
          txt = `${txt.slice(0,i)}${txt.slice(i+1,txt.length)}`;
          i -= 1;
        }
        else if (txt.charAt(i) === 'o') {
          //replace o's with 0's
          txt = `${txt.slice(0,i)}0${txt.slice(i+1,txt.length)}`; 
          i += 1;
        }
        else {
          txt = txt;
          i += 1;
        }
      }
      this.text = txt.toLowerCase();
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[0]).setDescription(`${this.emojis[0]} ${this.text}`));
    },
    tavros: function () {
      var i = 1;
      var txt = this.text.toUpperCase();
      txt = `${txt.charAt(0).toLowerCase()}${txt.slice(1, txt.length)}`;
      while (i < txt.length) {
        if (txt.charAt(i) === '.') {
          txt = `${txt.slice(0, i)},${txt.slice(i+1,txt.length)}`
        }
        else if (txt.slice(i-2,i) === ", ") {
          txt = `${txt.slice(0, i)}${txt.charAt(i).toLowerCase()}${txt.slice(i+1,txt.length)}`
        }
        i += 1;
      }
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[1]).setDescription(`${this.emojis[1]} ${txt}`));
    },
    sollux: function () {
      var i = 0;
      var txt = this.text.toLowerCase();
      while (i < txt.length) {
        if (txt.charAt(i) === 'i') {
          //repeat i's
          txt = `${txt.slice(0, i)}ii${txt.slice(i+1,txt.length)}`
          i+=1;
        }
        else if (txt.charAt(i) === 's') {
          //replace s's with 2's
          txt = `${txt.slice(0, i)}2${txt.slice(i+1,txt.length)}`
        }
        else if (txt.indexOf("to") === i) {
          txt = `${txt.slice(0,i)}2${txt.slice(i+2, txt.length)}`
          i -= 1;
        }
        else if (txt.indexOf("too") === i) {
          txt = `${txt.slice(0,i)}2${txt.slice(i+3, txt.length)}`
          i -= 2;
        }
        i += 1;
      }
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[2]).setDescription(`${this.emojis[2]} ${txt}`));
    },
    karkat: function () {
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[3]).setDescription(`${this.emojis[3]} ${this.text.toUpperCase()}`));
    },
    nepeta: function () {
      var txt = this.text.toLowerCase();
      var i = 0;
      while (i < txt.length) {
        if (txt.slice(i, i+2) === "ee") {
          //replace ee with 33
          txt = `${txt.slice(0,i)}33${txt.slice(i+2,txt.length)}`
          i += 1;
        }
        else if (txt.slice(i, i+3) === "per") {
          txt = `${txt.slice(0,i)}purr${txt.slice(i+3,txt.length)}`;
          i += 2;
        }
        else if (txt.slice(i, i+2) === "er") {
          txt = `${txt.slice(0,i)}ur${txt.slice(i+2,txt.length)}`
          i += 1;
        }
        else if (txt.slice(i, i+2) === "po") {
          txt = `${txt.slice(0,i)}paw${txt.slice(i+2,txt.length)}`
          i += 2;
        }
        else if (txt.slice(i, i+3) === "pau") {
          txt = `${txt.slice(0,i)}paw${txt.slice(i+3,txt.length)}`
          i += 2;
        }
        else {
          i += 1;
        }
      }
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[4]).setDescription(`${this.emojis[4]} :33< ${txt}`));
    },
    kanaya: function () {
      var txt = this.text;
      txt = `${txt.charAt(0).toUpperCase()}${txt.slice(1, txt.length)}`;
      var i = 0;
      while (i < txt.length) {
        if (txt.charAt(i) === '.' || txt.charAt(i) === ','|| txt.charAt(i) === '\'' || txt.charAt(i) === '?' || txt.charAt(i) === '!') {
          //cut out punctuation
          txt = `${txt.slice(0,i)}${txt.slice(i+1,txt.length)}`;
          i -= 1;
        }
        else if (txt.charAt(i) === " ") {
          txt = `${txt.slice(0,i+1)}${txt.charAt(i+1).toUpperCase()}${txt.slice(i+2, txt.length)}`;
        }
        i += 1;
      }
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[5]).setDescription(`${this.emojis[5]} ${txt}`));
    },
    terezi: function () {
      var txt = this.text.toUpperCase();
      var i = 0;
      while (i < txt.length) {
        if (txt.charAt(i) === 'I') {
          txt = `${txt.slice(0,i)}1${txt.slice(i+1,txt.length)}`;
        }
        else if (txt.charAt(i) === 'E') {
          txt = `${txt.slice(0,i)}3${txt.slice(i+1,txt.length)}`;
        }
        else if (txt.charAt(i) === 'A') {
          txt = `${txt.slice(0,i)}4${txt.slice(i+1,txt.length)}`;
        }
        else if (txt.charAt(i) === '.') {
          txt = `${txt.slice(0,i)}${txt.slice(i+1,txt.length)}`;
          i -= 1;
        }
        else if (txt.slice(i, i+2) === ":)") {
          txt = `${txt.slice(0,i)}>:]${txt.slice(i+2,txt.length)}`;
          i += 1;
        }
        else if (txt.slice(i, i+2) === ":(") {
          txt = `${txt.slice(0,i)}>:[${txt.slice(i+2,txt.length)}`;
          i += 1;
        }
        i += 1;
      }
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[6]).setDescription(`${this.emojis[6]} ${txt}`));
    },
    vriska: function () {
      var txt = this.text;
      txt = `${txt.charAt(0).toUpperCase()}${txt.slice(1,txt.length)}.`;
      var i = 0;
      while (i < txt.length) {
        if (txt.slice(i,i+3) === "ate") {
          txt = `${txt.slice(0, i)}8${txt.slice(i+3,txt.length)}`;
          i -= 2;
        }
        else if (txt.slice(i,i+5) === "eight") {
          txt = `${txt.slice(0, i)}8${txt.slice(i+5,txt.length)}`;
          i -= 4;
        }
        else if (txt.charAt(i).toLowerCase() === "b") {
          txt = `${txt.slice(0, i)}8${txt.slice(i+1,txt.length)}`;
        }
        else if (i > 2 && txt.slice(i-2,i) === ". ") {
          txt = `${txt.slice(0, i)}${txt.charAt(i).toUpperCase()}${txt.slice(i+1,txt.length)}`;
        }
        i += 1;
      }
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[7]).setDescription(`${this.emojis[7]} ${txt}`));
    },
    equius: function () {
      var txt = this.text;
      txt = `${txt.charAt(0).toUpperCase()}${txt.slice(1,txt.length)}.`;
      var i = 0;
      while (i < txt.length) {
        if (txt.charAt(i) === 'x') {
          txt = `${txt.slice(0, i)}%${txt.slice(i+1,txt.length)}`
        }
        else if (txt.slice(i, i+6) === "strong") {
          txt = `${txt.slice(0,i)}${txt.slice(i,i+6).toUpperCase()}${txt.slice(i+6,txt.length)}`;
        }
        else if (txt.slice(i, i+2) === "oo" || txt.slice(i, i+2) === "ew" || txt.slice(i, i+2) === "ue") {
          txt = `${txt.slice(0, i)}00${txt.slice(i+2,txt.length)}`;
        }
        else if (txt.slice(i, i+3) === "nay") {
          txt = `${txt.slice(0, i)}neigh${txt.slice(i+3,txt.length)}`;
          i += 2;
        }
        else if (i > 2 && txt.slice(i-2,i) === ". ") {
          txt = `${txt.slice(0, i)}${txt.charAt(i).toUpperCase()}${txt.slice(i+1,txt.length)}`;
        }
        i += 1;
      }
     return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[8]).setDescription(`${this.emojis[8]} D--> ${txt}`)); 
    },
    gamzee: function () {
      var txt = this.text;
      for (var i = 0; i < txt.length; i++) {
        if (i % 2 == 0) {
          if (txt[i].toLowerCase() === txt[i]) { //make uppercase
            txt = `${txt.slice(0,i)}${txt[i].toUpperCase()}${txt.slice(i+1,txt.length)}`;
          }
        }
        else {
          if (txt[i].toUpperCase() === txt[i]) { //make lowercase
            txt = `${txt.slice(0,i)}${txt[i].toLowerCase()}${txt.slice(i+1,txt.length)}`;
          }
        }
      }
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[9]).setDescription(`${this.emojis[9]} ${txt} :o)`)); 
    },
    eridan: function () {
      var txt = this.text.toLowerCase();
      var i = 0;
      while (i < txt.length) {
        if (txt[i] === 'v' || txt[i] === 'w') {
          if (txt.slice(i, i+6) === "vriska") {
            txt = `${txt.slice(0,i)}vris${txt.slice(i+6,txt.length)}`;
            i -= 3;
          }
          else {
            txt = `${txt.slice(0,i)}${txt[i]}${txt[i]}${txt.slice(i+1,txt.length)}`;
            i += 1;
          }
        }
        else if (txt.slice(i,i+4) === "ing ") {
          txt = `${txt.slice(0,i)}in ${txt.slice(i+4,txt.length)}`;
          i -= 1;
        }
        else if (txt.slice(i, i+4) === " an " || txt.slice(i, i+2) === " of ") {
          var rand = Math.floor(Math.random() * 3);
          if (rand == 2) {
            txt = `${txt.slice(0,i)} a ${txt.slice(i+4,txt.length)}`;
            i -= 1;
          }
        }
        else if (txt.slice(i, i+6) === "kanaya") {
          txt = `${txt.slice(0,i)}kan${txt.slice(i+6,txt.length)}`;
            i -= 3;
        }
        else if (txt.slice(i, i+6) === "feferi") {
          txt = `${txt.slice(0,i)}fef${txt.slice(i+6,txt.length)}`;
            i -= 3;
        }
        i += 1;
      }
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[10]).setDescription(`${this.emojis[10]} ${txt}`));
    },
    feferi: function () {
      var txt = this.text;
      var i = 0;
      while (i < txt.length) {
        if (txt[i].toLowerCase() === 'h') {
          txt = `${txt.slice(0,i)})(${txt.slice(i+1,txt.length)}`;
          i += 1;
        }
        else if (txt[i] === 'E') {
          txt = `${txt.slice(0,i)}-E${txt.slice(i+1,txt.length)}`;
          i += 1;
        }
        i += 1;
      }
      return msg.channel.send(new client.discord.RichEmbed().setColor(this.colors[11]).setDescription(`${this.emojis[11]} ${txt}`));
    },
  }
  
  if (troll === undefined || say === undefined) {
    return msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Missing arguments!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
  }
  
  switch (troll) {
    case trollify.trolls[0]:
      trollify.aradia();
      break;
    case trollify.trolls[1]:
      trollify.tavros();
      break;
    case trollify.trolls[2]:
      trollify.sollux();
      break;
    case trollify.trolls[3]:
      trollify.karkat();
      break;
    case trollify.trolls[4]:
      trollify.nepeta();
      break;
    case trollify.trolls[5]:
      trollify.kanaya();
      break;
    case trollify.trolls[6]:
      trollify.terezi();
      break;
    case trollify.trolls[7]:
      trollify.vriska();
      break;
    case trollify.trolls[8]:
      trollify.equius();
      break;
    case trollify.trolls[9]:
      trollify.gamzee();
      break;
    case trollify.trolls[10]:
      trollify.eridan();
      break;
    case trollify.trolls[11]:
      trollify.feferi();
      break;
    default:
      return msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription("❗️Not a valid troll name!")).then(msg => {msg.delete(2000).then(()=>{console.log("sent")}).catch(err => {console.error(err)})}).catch(console.error);
      break;
  }
},}