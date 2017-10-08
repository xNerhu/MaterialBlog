const { upload } = require('../config')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const fs = require('fs')
const Img = require('../utils/img')
const Directory = require('../utils/directory')

module.exports = (app, defaultDb) => {
  app.get('/user-info', (req, res) => {
    if (req.user != null) {
      res.json({
        success: true,
        info: {
          _id: req.user._id,
          login: req.user.login,
          username: req.user.username,
          email: req.user.email,
          avatar: req.user.avatar,
          moderator: req.user.moderator
        }
      })
    } else {
      res.json({
        success: false,
        message: 'User is not logged!'
      })
    }
  })

  app.get('/get-moderators', (req, res) => {
    let collection = defaultDb.collection('users')

    collection.find({moderator: true}).toArray((err, results) => {
      if (err) return console.error(err)

      let _results = []

      for (var i = 0; i < results.length; i++) {
        const result = results[i]

        _results.push({
          _id: result._id,
          username: result.username
        })
      }

      res.json(_results)
    })
  })

  app.post('/change-user-settings', (req, res) => {
    let collection = defaultDb.collection('users')

    if (req.user == null) return res.send({message: 'User is not logged!', success: false})

    let avatar = req.user.avatar

    if (req.body.avatar != null && !req.body.avatar.includes('default-avatar')) {
      const path = upload.directory + upload.avatars + req.user._id
      const isBase64 = (req.body.avatar.indexOf(upload.directory + upload.avatars) < 0)

      if (isBase64) {
        Img.deleteAllPictures(path)
        avatar = Img.saveBase64ToFile(req.body.avatar, path)
      }
    }

    collection.update({_id: ObjectId(req.user._id)}, {
      $set: {
        login: req.body.login || req.user.login,
        username: req.body.username || req.user.username,
        email: req.body.email || req.user.email,
        avatar: avatar
      }
    }, (err) => {
      if (req.body.password != null && req.body.password !== '' && req.body.password === req.body.passwordVerify) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) return res.json({success: false})

          collection.update({_id: ObjectId(req.user._id)}, {
            $set: {
              password: hash
            }
          }, (err) => {
            if (err) return res.json({success: false})

            res.json({success: true})
          })
        })
      } else {
        res.json({success: true})
      }
    })
  })
}
