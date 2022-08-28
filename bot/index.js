const lineBot = require('@line/bot-sdk')
const lineBotMiddleware = lineBot.middleware
const config = {
  channelAccessToken: process.env.BOT_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.BOT_CHANNEL_SECRET
}

module.exports = {
  lineBot,
  lineBotMiddleware,
  config
}