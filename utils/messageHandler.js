const bot = require('../bot/index')
const client = new bot.lineBot.Client(bot.config)
const { ImgurClient } = require('imgur')

const textHandler = async event => {
  const text = event.message.text
  let echo = { type: 'text', text: event.message.text }

  if (text === '/how') {
    echo = [
      { type: 'text', text: '$超極巨皮卡丘可以將任意蝦皮網址縮短成最適合社群使用的長度', emojis: [{ index: 0, productId: '5ac2213e040ab15980c9b447', emojiId: '007' }] },
      { type: 'text', text: '只需要把蝦皮上長長的連結複製貼進來,或是利用Line的分享功能直接分享進來' },
      { type: 'text', text: '超極巨皮卡丘就會從寶貝球裡出來打工' }
    ]
  }
  return echo
}
const onwer = ['Ud6ea077172cd4b4235877efd079f255f']
const imageHandler = async event => {
  const echo = []
  const imageID = event.message.id
  echo.push({ type: 'text', text: imageID })
  client.getMessageContent(imageID)
    .then(stream => {
      stream.on('data', async (chunk) => {
        console.log(chunk.toString('base64'))
        const imgur_client = new ImgurClient({
          refreshToken: process.env.IMGUR_REFRESH_TOKEN,
          clientId: process.env.IMGUR_CLIENTID,
          clientSecret: process.env.IMGUR_CLIENT_SECRET
        })
        const data = await imgur_client.upload({
          image: chunk,
          type: 'stream',
          album: process.env.ALBUM_ID
        })
        console.log(data)
      })
      stream.on('error', err => {
        console.log(err)
      })
    })
  return echo
}

const stickerHandler = async event => {
  const stickerId = getRandom(1988, 2027)
  const echo = [
    { type: 'text', text: '(皮卡皮卡~' },
    { type: 'sticker', packageId: '446', stickerId: stickerId.toString() }
  ]
  return echo
}


const getRandom = (min,max) => {
  return Math.floor(Math.random()*(max-min+1))+min
}

module.exports = {
  textHandler,
  stickerHandler,
  imageHandler
}