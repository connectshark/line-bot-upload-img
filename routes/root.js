const express = require('express')
const router = express.Router()
const path = require('path')
const { ImgurClient } = require('imgur')

router
  .get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
  })
  .post('/', function(req, res, next) {
    upload(req, res, async () => {
      const client = new ImgurClient({
        clientId: process.env.IMGUR_CLIENTID,
        clientSecret: process.env.IMGUR_CLIENT_SECRET,
        refreshToken: process.env.IMGUR_REFRESH_TOKEN,
      });
      const response = await client.upload({
        image: req.files[0].buffer.toString('base64'),
        type: 'base64',
        album: process.env.IMGUR_ALBUM_ID
      });
      res.send({ url: response.data.link });
    })
  })

module.exports = router