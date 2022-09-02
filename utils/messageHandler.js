const bot = require('../bot/index')
const bot_client = new bot.lineBot.Client(bot.config)
const imgur_client = require('../imgur/index')
const { Readable } = require('stream')

const imageHandler = async event => {
  const imageID = event.message.id
  const buffers = []
  const readableBuffer = await bot_client.getMessageContent(imageID)
  return new Promise((resolve, reject) => {
    readableBuffer.on('data', chunk => {
      buffers.push(chunk)
    })
    readableBuffer.on('error', err => {
      console.log(err)
      reject()
    })
    readableBuffer.on('end', async () => {
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