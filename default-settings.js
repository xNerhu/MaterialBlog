const express = require('express')
const { MongoClient } = require('mongodb')
const { mongoData, expressData } = require('./config')
const resetToDefaultSettings = require('./utils/default-settings')

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

  console.log('Connected, backing to default settings...')

  resetToDefaultSettings(defaultDb, () => {
    console.log('Successfully backed to fabric settings')
  })
})

app.listen(expressData.port - 1, () => {
  console.log('Connecting to database...')
})
