import {config} from 'dotenv'
import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";

config()

const tokenTelegram = process.env.TELEGRAM_API_TOKEN
const tokenOPENAI = process.env.OPENAI_API_KEY
const bot = new TelegramBot(tokenTelegram, {polling: true});
const openai = new OpenAI(`Authorization: Bearer ${tokenOPENAI}`);
let images = {};

const OPENAI = async (url) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: {
              "url": `${url}`,
            },
          },
        ],
      },
    ],
  });
  return response.choices[0];
}

const start = () => {

  bot.setMyCommands(
    [
      {
        command: '/start',
        description: 'Start chat'
      },
      {
        command: '/info',
        description: 'Info user name'
      },
      {
        command: '/download_image',
        description: 'Download image'
      }
    ]
  )
  bot.on('message', async msg => {
    const text = msg.text;
    const name = msg.chat.first_name;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://sl.combot.org/genesisvision/webp/0xf09f8c95.webp')
      return bot.sendMessage(chatId, `Wellcome from telegram bot vision`)
    }
    if (text === '/info') {
      return bot.sendMessage(chatId, `your name: ${name}`)
    }
    if (text === '/download_image') {
      return  bot.sendMessage(chatId, 'Enter to url image for download')
    }
    if (text.includes('https://')) {
      try {
        images['chatId'] = {url: text};
        const response = await OPENAI(images['chatId'].url)
        return bot.sendMessage(chatId, response.message.content)
      }
      catch (e) {
        return bot.sendMessage(chatId, `I don't understand you`)
      }
    }
    return bot.sendMessage(chatId, `I don't understand you`)
  })
}

start();








