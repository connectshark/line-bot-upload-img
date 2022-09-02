const bot = require('../bot/index')
const bot_client = new bot.lineBot.Client(bot.config)
const imgur_client = require('../imgur/index')
const { Readable } = require('stream')

const imageHandler = async event => {
  const imageID = event.message.id
  const buffers = []
  const stream = await bot_client.getMessageContent(imageID)
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => {
      buffers.push(chunk)
    })
    stream.on('error', err => {
      console.log(err)
      reject()
    })
    stream.on('end', async () => {
      const stream = Readable.from(buffers)
      const data = await imgur_client.upload({
        image: stream,
        type: 'stream',
        album: process.env.IMGUR_ALBUM_ID
      })
      resolve([{ type: 'text', text: data.data.link }])
    })
  })
}

module.exports = {
  imageHandler
}