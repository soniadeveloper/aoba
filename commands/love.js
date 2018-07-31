exports.run = (client, msg, args) => {
  if (args.length != 2) {
    msg.channel.send({embed: {
      color: client.color,
      description: "Must input two arguments!"
  }}).then(msg => {msg.delete(2000)});
}
  else { 
  var first = args[0].toLowerCase();
  var second = args[1].toLowerCase();
  if(first === second) {
    msg.channel.send({embed: {
      color: client.color,
      description: "Don't selfship :("
    }}).then(msg => {msg.delete(2000)});
  }
  else {
    if(first.charAt(0) === '<' && first.charAt(1) === '@' && second.charAt(0) === '<' && second.charAt(1) === '@') {
      first = first.substring(3, first.length-1);
      second = second.substring(3, second.length-1);
    }
    else if (first.charAt(0) === '<' && first.charAt(1) === '@') {
      first = first.substring(3, first.length-1);
    }
    else if (second.charAt(0) === '<' && second.charAt(1) === '@') {
      second = second.substring(3, second.length-1);
    }
    function calcSum(str) {
      var sum = 0;
      for (var i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
      }
      return sum;
    }
    var firstSum = calcSum(first);
    var secondSum = calcSum(second);
    if (args.join(" ") === "grace milktea") {
      var pct = 100;
    }
    else {
      var pct = (firstSum + secondSum) % 101;
    }

    var emoji = "";

    if (pct <= 20) {
      emoji = ". 😭";
    }
    else if (pct >= 20 && pct < 40) {
      emoji = ". 😕";
    }
    else if (pct >= 40 && pct < 60) {
      emoji = ". 🤔";
    }
    else if (pct >= 60 && pct < 80) {
      emoji = ". 😚";
    }
    else if (pct >= 80 && pct < 99) {
      emoji = "! 😘";
    }
    else {
      emoji = "!! 😍";
    }

    msg.channel.send({embed: {
      color: client.color,
      description: `💞**Love Guru**💞 \n\n **${args[0]}** and **${args[1]}** are **${pct}%** compatible` + emoji
    }});
    }
  }
}
