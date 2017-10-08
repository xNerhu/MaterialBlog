const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { mongoData, expressData, upload, autoSave, autoSaveInterval, autoSaveDirectory } = require('./config')
const path = require('path')
const Directory = require('./utils/directory')
const makeDataCopy = require('./utils/data-copy')

const app = express()
const mongoURL = `mongodb://${mongoData.user}:${mongoData.password}@${mongoData.ip}:${mongoData.port}/admin`

app.use(helmet())
app.use(cookieParser())
app.use(session({secret: 'secret', saveUninitialized: true, resave: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser({limit: '16mb'}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'build')))
app.use('/images', express.static('images'))

app.set('view engine', 'ejs')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, UPLOAD')
  next()
})

MongoClient.connect(mongoURL, (err, db) => {
  if (err) return console.error(err)
  const defaultDb = db.db(mongoData.db)

  console.log('Connected to database')

  require('./passport')(passport, defaultDb)
  require('./routers')(passport, app, defaultDb)

  console.log(`Auto save is toggled ${(autoSave) ? 'on' : 'off'}`)

  if (autoSave) {
    setInterval(() => {
      makeDataCopy(defaultDb)
    }, autoSaveInterval)
  }
})

Directory.createIfNotExists('images')
Directory.createIfNotExists(upload.directory)
Directory.createIfNotExists(upload.directory + upload.gallery)
Directory.createIfNotExists(upload.directory + upload.posts)
Directory.createIfNotExists(autoSaveDirectory)

app.listen(expressData.port)
