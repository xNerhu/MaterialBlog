const express = require('express')
const { MongoClient } = require('mongodb')
const { mongoData, expressData, autoSaveDirectory } = require('./config')
const Directory = require('./utils/directory')
const makeDataCopy = require('./utils/data-copy')

const app = express()
const mongoURL = `mongodb://${mongoData.user}:${mongoData.password}@${mongoData.ip}:${mongoData.port}/admin`

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

MongoClient.connect(mongoURL, (err, db) => {
  if (err) return console.error(err)
  const defaultDb = db.db(mongoData.db)

  console.log('Connected, making save...')

  makeDataCopy(defaultDb, () => {
    console.log('Data has been successfully saved!')
    process.exit()
  })
})

app.listen(expressData.port + 1, () => {
  console.log('Connecting to database...')
})

Directory.createIfNotExists(autoSaveDirectory)
