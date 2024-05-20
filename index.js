import {config} from 'dotenv'
import TelegramBot from "node-telegram-bot-api";
import {downloadImageOptions} from "./options.js";

config()

const token = process.env.TELEGRAM_API_TOKEN
const bot = new TelegramBot(token, {polling: true});

let images = {};

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
      return 'download'
    }
    return bot.sendMessage(chatId, `I don't understand you`)
  })
}

start();








