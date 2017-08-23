const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const { MongoClient } = require('mongodb')
const { mongoData, statusCodes, expressData } = require('./config')
const mongoPassword = require('./config-password').mongoPassword
const { isAuthenticated } = require('./security')

const app = express()
const mongoURL = `mongodb://${mongoData.user}:${mongoPassword}@${mongoData.ip}:${mongoData.port}/admin`

app.use(helmet())
app.use(cookieParser())
app.use(session({secret: 'secret', saveUninitialized: false, resave: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE')
  next()
})

MongoClient.connect(mongoURL, (err, db) => {
  if (err) return console.error(err)
  const defaultDb = db.db(mongoData.db)

  console.log('connected')

  require('./passport')(passport, defaultDb)
  require('./routers')(passport, app, defaultDb)
})

app.listen(expressData.port)
