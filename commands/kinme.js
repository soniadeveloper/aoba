exports.run = (client, msg) => {
      var name = msg.author.username;
      var options = ["**Sans** from **Undertale**", 
                     "**The Onceler** from **The Lorax**", 
                     "**Karamatsu Matsuno** from **Osomatsu-san**", 
                     "**Nico Yazawa** from **Love Live**", 
                     "**Tord** from **Eddsworld**", 
                     "**Gamzee Makara** from **Homestuck**", 
                     "**Nagito Komaeda** from **Danganronpa**", 
                     "**Ichimatsu Matsuno** from **Osomatsu-san**", 
                     "**Jimin** from **BTS**", 
                     "**Alexander Hamilton** from the hit musical **Hamilton**", 
                     "**Eridan Ampora** from **Homestuck**", 
                     "**Shrek** from **Shrek**", 
                     "**Dio Brando** from **Jojo's Bizzare Adventure**", 
                     "**Yurio Plisetsky** from **Yuri!!! on Ice**", 
                     "**Jon Arbuckle** from **Garfield**", 
                     "**Hisoka** from **Hunter X Hunter**", 
                     "**Aoba Seragaki** from **Dramatical Murder**",
                    "**Junko Enoshima** from **Danganronpa**",
                    "**Pearl** from **Steven Universe**",
                    "**Umaru Doma** from **Himouto! Umaru-chan**",
                    "**Twilight Sparkle** from **My Little Pony**",
                    "**Yuno Gasai** from **Future Diary**",
                    "**Mari Ohara** from **Love Live**",
                    "**Guy Fieri** from **The Food Network**",
                    "**Kanna Kamui** from **Miss Kobayashi's Dragon Maid**",
                    "**Todd Howard** from **Skyrim**"];
  var imgUrls = ["https://vignette.wikia.nocookie.net/scratchpad/images/6/6a/Sans.jpg/revision/latest?cb=20160720231031",
                "https://vignette.wikia.nocookie.net/villains/images/9/9b/Lorax-disneyscreencaps.com-6671.jpg/revision/latest?cb=20160129050546",
                "https://i.ytimg.com/vi/mgOlWHMbduw/maxresdefault.jpg",
                "https://vignette.wikia.nocookie.net/love-live/images/7/7b/116_S1Ep7.png/revision/latest?cb=20150521190554",
                "https://vignette.wikia.nocookie.net/eddsworld/images/2/25/TordEnd.jpg/revision/latest?cb=20160309213140",
                "https://vignette.wikia.nocookie.net/unanything/images/d/d1/GamzeeMakara.png/revision/latest?cb=20160908135912",
                "https://vignette.wikia.nocookie.net/p__/images/a/a7/Komaeda_with_Kimura%27s_medicine.JPG/revision/latest?cb=20161127000739&path-prefix=protagonist",
                "https://carboncostume.com/wordpress/wp-content/uploads/2018/05/chara_ichimatsu-osomatsu-kun.jpg",
                "https://www.sbs.com.au/popasia/sites/sbs.com.au.popasia/files/styles/full/public/bts-jimin-2.jpg?itok=pHd4V1y3&mtime=1485999062",
                "https://pmcvariety.files.wordpress.com/2017/12/hamilton-london.jpg?w=1000&h=563&crop=1",
                "https://vignette.wikia.nocookie.net/mspaintadventures/images/4/45/Eridan_3X_Showdown.png/revision/latest?cb=20110814020106",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLADeOglG0-tQhqaVhb4QsfGFoR-NPR8O_mqvDrQEQ3HU6SJSi",
                "https://i.imgur.com/8jOwokO.jpg",
                "https://i.ytimg.com/vi/Fu7Tnt6RtRc/maxresdefault.jpg",
                "https://upload.wikimedia.org/wikipedia/en/thumb/6/63/Jon_arbuckle.svg/1200px-Jon_arbuckle.svg.png",
                "https://i.pinimg.com/originals/a6/6f/e5/a66fe5b0a550fc759b63eca652cae83e.jpg",
                "https://vignette.wikia.nocookie.net/dramaticalmurder/images/5/59/Aobaanime.png/revision/latest?cb=20140909005406",
                "https://i.ytimg.com/vi/myD1U91wyjs/maxresdefault.jpg",
                "https://nyoobserver.files.wordpress.com/2017/03/steven-universe-s01e28-space-race-720p-web-dl-aac2-0-h-264-rainbowcrash-mkv_snapshot_04-42_-2014-11-17_16-19-43.png",
                "http://www.anime-evo.net/wp-content/uploads/2015/07/Himouto-Umaru-chan-05.jpeg",
                "https://vignette.wikia.nocookie.net/the-princess/images/e/e5/Mlp_fim_twilight_sparkle_happy_vector_3_by_luckreza8-db4ql0m.png/revision/latest?cb=20180411192543",
                "https://vignette.wikia.nocookie.net/futurediary/images/a/a5/YunoYandereFace.jpg/revision/latest?cb=20120128011750",
                "https://i.ytimg.com/vi/DM1g_tCFnec/maxresdefault.jpg",
                "https://3apq7g38q3kw2yn3fx4bojii-wpengine.netdna-ssl.com/wp-content/uploads/2017/04/482774787_Guy-Fieri.jpg",
                "http://goboiano.com/wp-content/uploads/2017/02/Kanna-Kamui-Miss-Kobayashis-Dragon-Maid-1-1.jpg",
                "https://i.kym-cdn.com/entries/icons/original/000/017/752/286.jpg"]

      var len = options.length;
      var val = 0;
      for (var i = 0; i < name.length; i++) {
        val += name.charCodeAt(i);
      }
      var c = val % options.length;
      var kin = options[c];
      var url = imgUrls[c];
      var embed = new client.discord.RichEmbed().setColor(client.color).setDescription(`${msg.author.username}, Your Aoba-assigned Kin™ is ${kin}!`)
      .setImage(url);
      msg.channel.send(embed);
}
