const bot = require('../bot/index')
const client = new bot.lineBot.Client(bot.config)
const messageHandler = require('../utils/messageHandler')



const messageObject = {
  text: messageHandler.textHandler,
  sticker: messageHandler.stickerHandler,
  image: messageHandler.imageHandler
}

const quick = [
  {
    type: 'text',
    text: '歡迎加入超極巨皮卡丘好友 $',
    emojis: [
      {
        index: 13,
        productId: '5ac1bfd5040ab15980c9b435',
        emojiId: '085'
      }
    ]
  },
  {
    type: 'text',
    text: '接續蝦英雄精神產生的快速機器人, 可以直接輸入任意蝦皮網址',
  },
  {
    type: 'text',
    text: '或是輸入"/how"來查詢如何使用說明',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            label: '如何使用?',
            text: '/how'
          }
        }
      ]
    }
  }
]
const allowMessageType = ['text', 'sticker', 'image']

const eventHandler = async (event) => {
  switch (event.type) {
    case 'message':
      if (!allowMessageType.includes(event.message.type)) {
        return Promise.resolve(null)
      }
      const messageType = event.message.type
      const echo = await messageObject[messageType](event)
      return client.replyMessage(event.replyToken, echo)
    case 'follow':
      return client.replyMessage(event.replyToken, quick)
    default:
      return Promise.resolve(null)
  }
}

module.exports = {
  eventHandler
}