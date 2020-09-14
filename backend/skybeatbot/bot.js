const Telegraf = require("telegraf");

const bot = new Telegraf("1348642269:AAFW8YlrqXz473m240oa0mw2d6vIL_NfDVA");

const axios = require("axios");

const helpMessage = `

* Wecome to the SkyBeatBot Here are my list of Commands*


/trending  ---- Get the top  trending  songs and  basic information (done)


 /search <artist name> --- get an artist basic information (still working on it)

 /help --- Get the list of commands

`;

function sendGroup(ctx, data, i) {
  // bot.telegram.sendMessage(ctx.from.id, Message, {
  //   parse_mode: "HTML",
  // });

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      let Message = `
      <em>NAME</em> 
     <b>  ${data[i].name}</b>
      
        <em>Popularity </em> 
     <strong>${data[i].popularity}</strong>
      `;
      let ImageMessage = `${data[i].name}  image`;
      let AudioMessage = `${data[i].name} audio preview`;
      bot.telegram.sendMessage(ctx.chat.id, Message, {
        parse_mode: "HTML",
      });

      bot.telegram.sendAudio(ctx.chat.id, data[i].preview_url, {
        parse_mode: "HTML",
        caption: AudioMessage,
      });

      bot.telegram.sendPhoto(ctx.chat.id, data[i].images[0].url, {
        parse_mode: "HTML",
        caption: ImageMessage,
      });
      resolve(123);
    }, 2000);
    // not taking our time to do the job
  });
}

bot.start((ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, helpMessage, {
    parse_mode: "markdown",
  });
});

bot.command(["Trending", "trending"], async (ctx) => {
  let data;
  try {
    const cool = await axios.get(
      "https://skybeat-spotify-application.herokuapp.com/trending?limit=10"
    );

    data = cool.data;

    for (let i = 0; i < 10; i++) {
      if (data[i].preview_url == null) {
        continue;
      } else {
        let cool = await sendGroup(ctx, data, i);
      }
    }
  } catch (e) {
    bot.telegram.sendMessage(
      ctx.from.id,
      "can't process information at the moment",
      {
        parse_mode: "HTML",
      }
    );
    console.log(e);
  }
});

bot.command(["Search", "search"], async (ctx) => {
  let data;
  let input = ctx.message.text;
  let InputArray = input.split(" ");

  // " /cat"
  if (InputArray.length <= 1) {
    ctx.reply(
      "Please type the name of the artist and leave a space between the name and command i.e: /search megan thee stallion"
    );
  } else {
    try {
      InputArray.shift();
      name = InputArray.join(" ");
      const cool = await axios.get(
        `https://skybeat-spotify-application.herokuapp.com/search?name=${name}`
      );
      data = cool.data;

      let Message = `
      <em>NAME</em> 
     <b>  ${data[0].artist.name}</b>
      
    <em>Genres </em> 
     <strong>${data[0].artist.genres.join(",")}</strong>
      `;
      let ImageMessage = `${data[0].artist.name}  image`;

      bot.telegram.sendMessage(ctx.chat.id, Message, {
        parse_mode: "HTML",
      });

      bot.telegram.sendPhoto(ctx.chat.id, data[0].artist.images[0].url, {
        parse_mode: "HTML",
        caption: ImageMessage,
      });
    } catch (e) {
      ctx.reply("Can  not process, enter a valid artist name  ");
      console.log(e.message);
    }
  }
});

bot.help((ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, helpMessage, {
    parse_mode: "markdown",
  });
});

bot.launch();
