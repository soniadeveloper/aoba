exports.run = (client, msg, args) => {
  var cry = args.join(" ");
  console.log(cry);
  var crying = {
    text: cry,
    comma: function (i) {
      var txt = this.text;
      var len = txt.length;
      var first = txt.slice(0,i);
      var second = txt.slice(i, len);
      var repeat = Math.ceil(Math.random() * 1);
      this.text = `${first}${",".repeat(repeat)}${second}`;
    },
    semicolon: function (i) {
      var txt = this.text
      var len = txt.length;
      var first = txt.slice(0,i);
      var second = txt.slice(i, len);
      var repeat = Math.ceil(Math.random() * 1);
      this.text = `${first}${";".repeat(repeat)}${second}`;
    },
    space: function (i) {
      var txt = this.text
      var len = txt.length;
      var first = txt.slice(0,i);
      var second = txt.slice(i, len);
      var repeat = Math.ceil(Math.random() * 1);
      this.text = `${first}${" ".repeat(repeat)}${second}`;
    },
    repeat: function (i) {
      var txt = this.text
      var len = txt.length;
      var first = txt.slice(0,i);
      var second = txt.slice(i, len);
      if (i > 0) {
        this.text = `${first}${txt.charAt(i-1)}${second}`;
      }
    },
    slash: function (i) {
      var txt = this.text
      var len = txt.length;
      var first = txt.slice(0,i);
      var second = txt.slice(i, len);
      this.text = `${first}${"/"}${second}`;
    },
    upper: function (i) {
      var txt = this.text
      var len = txt.length;
      var first = txt.slice(0,i-1);
      var second = txt.slice(i+1, len);
      this.text = `${first}${txt.charAt(i).toUpperCase()}${second}`;
    },
    random: function(i) {
      var txt = this.text
      var len = txt.length;
      var first = txt.slice(0,i);
      var second = txt.slice(i, len);
      var rand = Math.floor(Math.random() * 26) + 97;
      this.text = `${first}${String.fromCharCode(rand)}${second}`;
    }
  };
  var i = 1;
  while (i < crying.text.length) {
    var chanceOf = Math.floor(Math.random() * 4);
    var qChance = Math.floor(Math.random() * 7);
    if (chanceOf == 0) {
      switch (qChance) {
        case 0:
          crying.comma(i);
          break;
        case 1:
          crying.semicolon(i);
          break;
        case 2:
          crying.space(i);
          break;
        case 3:
          crying.repeat(i);
          break;
        case 4:
          crying.upper(i);
          break;
        case 5:
          crying.slash(i);
          break;
        case 6:
          crying.random(i);
          break;
      }
    }
    i += 1;
  }
  
  msg.channel.send(new client.discord.RichEmbed().setColor(client.color).setDescription(crying.text));
}