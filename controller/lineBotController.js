const bot = require('../bot/index')
const client = new bot.lineBot.Client(bot.config)
const messageHandler = require('../utils/messageHandler')

const messageObject = {
  image: messageHandler.imageHandler
}
const allowMessageType = ['image']

const eventHandler = async (event) => {
  switch (event.type) {
    case 'message':
      if (!allowMessageType.includes(event.message.type)) {
        return Promise.resolve(null)
      }
      const messageType = event.message.type
      const echo = await messageObject[messageType](event)
      return client.replyMessage(event.replyToken, echo)
    default:
      return Promise.resolve(null)
  }
}

module.exports = {
  eventHandler
}