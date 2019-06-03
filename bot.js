const TelegramBot = require('node-telegram-bot-api');
var request = require('request');
const token = YOUR_TOKEN;
const API_KEY = YOUR_API_KEY;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;

    text = "반갑습니다. :)\n*키워드를 입력하면 사진을 보내드립니다.*\n\n"
        +"모든 사진의 출처는 [Pixabay](https://pixabay.com/ko/)입니다.\n\n"
        +"❤ 제작자 `Dalha.v` ❤";
    bot.sendMessage(chatId, text, {parse_mode: "Markdown"});
});

bot.onText(/\/help/, (msg, match) => {
    const chatId = msg.chat.id;

    text = "반갑습니다. :)\n*키워드를 입력하면 사진을 보내드립니다.*\n\n"
        +"모든 사진의 출처는 [Pixabay](https://pixabay.com/ko/)입니다.\n\n"
        +"❤ 제작자 `Dalha.v` ❤";
    bot.sendMessage(chatId, text, {parse_mode: "Markdown"});
});


bot.on('message', (msg) => {
    if(msg.text.toString().toLowerCase().indexOf("/help")!==0 && msg.text.toString().toLowerCase().indexOf("/start")!==0) {
        const chatId = msg.chat.id;
        var text = msg.text.toString().replace(" ", "+");
        console.log(text);
        var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(text) + "&lang=ko&safesearch=true";
        request(URL, function (err, res, body) {
            if(err){
                console.log(err);
                bot.sendMessage(chatId, '다시 시도해주세요.');
            }

            var data = JSON.parse(body);
            if (parseInt(data.totalHits) > 0) {
                //random
                var num = Math.floor(Math.random() * (data.hits.length));
                //img
                url = data.hits[num].largeImageURL;
                //send
                user = "Photo by [" + data.hits[num].user.toString() + "](https://pixabay.com/users/" + data.hits[num].user.toString() + "-" + data.hits[num].user_id.toString() + ")\n";
                source = "Source page on [Pixabay](" + data.hits[num].pageURL + ")";
                bot.sendPhoto(chatId, url, {caption: user + source, parse_mode: "Markdown"},);
            } else
                bot.sendMessage(chatId, '해당하는 이미지가 없습니다.');
        });
    }
});


