require("dotenv").config();
const http = require('http')
const express = require('express')
const port = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler')

const app = express({
  logger: process.env.LOG || false,
  bodyLimit: 12485760,
  maxParamLength: 512
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require('./routes/index')(app)
require('./routes/user')(app)
require('./routes/product')(app)
require('./routes/transaction')(app)
app.get('*', (req, res) => res.status(404).send({
  status: false,
  message: 'Api tidak ditemukan.'
}))
app.patch('*', (req, res) => res.status(404).send({
  status: false,
  message: 'Api tidak ditemukan.'
}))
app.post('*', (req, res) => res.status(404).send({
  status: false,
  message: 'Api tidak ditemukan.'
}))
app.use(errorHandler)

app.set('port', port)

const server = http.createServer(app)
server.listen(port)

module.exports = app