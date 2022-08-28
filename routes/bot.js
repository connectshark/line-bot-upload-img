const express = require('express')
const router = express.Router()
const linebotController = require('../controller/lineBotController')
const bot = require('../bot/index')

router.post('/', bot.lineBotMiddleware(bot.config), (req, res) => {
  Promise
    .all(req.body.events.map(linebotController.eventHandler))
    .then(result => res.json(result))
    .catch(err => {
      res.status(500).end()
    })
})
module.exports = router