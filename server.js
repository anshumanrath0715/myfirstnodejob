const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World, Holla Mundo, Avibadana Viswa')
})

app.listen(3000)