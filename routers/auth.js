const bcrypt = require('bcrypt')
const Img = require('../utils/img.js')
const fs = require('fs')
const path = require('path')
const { ObjectId } = require('mongodb')
const { upload } = require('../config.js')

module.exports = (app, defaultDb, passport) => {
  /** Logs user.
   * Type post.
   * Body params:
   * @param {String} login or email
   * @param {String} password
   */
  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err)

      if (!user) {
        return res.send({
          message: info.message,
          success: false
        })
      }

      req.login(user, (err) => {
        if (err) return next(err)

        const base64 = Img.getBase64(user.avatar)

        return res.send({
          success: true,
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: base64,
          moderator: user.moderator
        })
      })
    })(req, res, next)
  })

  /**
   * Logouts user.
   */
  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect(!req.query.panel ? '/' : '/panel/login')
  })

  /** Registers user.
   * Type post.
   * Body params:
   * @param {String} login
   * @param {String} username
   * @param {String} email
   * @param {String} avatar
   * @param {String} password
   * @param {String} password verify - must be same as password
   */
  app.post('/register', (req, res) => {
    let collection = defaultDb.collection('users')

    // If login is incorrect (empty or less than 4)
    if (req.body.login == null || req.body.login.length < 3) return res.json({message: 'incorrect_login', success: false})
    // If username is incorrect (empty or less than 5)
    if (req.body.username == null || req.body.username.length < 5) return res.json({message: 'incorrect_username', success: false})
    // If email is incorrect (empty or less than 5)
    if (req.body.email == null || req.body.email.length < 5 || req.body.email.indexOf('@') === -1 || req.body.email.indexOf('.') === -1) {
      return res.json({message: 'incorrect_email', success: false})
    }
    // If password is incorrect (empty or less than 4)
    if (req.body.password == null || req.body.password.length < 4) return res.json({message: 'incorrect_password', success: false})
    // If password-verify is incorrect (empty or less than 4)
    if (req.body.passwordverify == null || req.body.passwordverify.length < 4) return res.json({message: 'incorrect_password_verify', success: false})
    // If passwords are not same
    if (req.body.password !== req.body.passwordverify) return res.json({message: 'diffrent_passwords', success: false})

    collection.findOne({
      login: req.body.login
    }, (err, result) => {
      if (err) return res.json(err)
      if (result != null) return res.json({message: 'login_exists', success: false})

      collection.findOne({
        email: req.body.email.toLowerCase()
      }, (err, result) => {
        if (err) return res.json(err)
        if (result != null) return res.json({message: 'email_exists', success: false})

        // Hash password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) return res.json({message: err, success: false})

          collection.insertOne({
            login: req.body.login.toLowerCase(),
            username: req.body.username,
            email: req.body.email.toLowerCase(),
            avatar: 'images/default-avatar.png',
            password: hash,
            admin: false,
            moderator: false,
            date: new Date(),
            checkbox: req.body.checkbox
          }, (err, user) => {
            if (err) return res.json({message: err, success: false})

            // Update user avatar
            if (req.body.avatar != null && req.body.avatar.includes('data:')) {
              const path = Img.saveBase64ToFile(req.body.avatar, `${upload.directory}${upload.avatars}/${user.ops[0]._id}`)

              collection.update({
                _id: user.ops[0]._id
              }, {
                $set: {
                  avatar: path
                }
              }, (err) => {
                if (err) console.log(err)
                console.log('Changed registered user avatar')
              })
            }

            res.send({success: true})
          })
        })
      })
    })
  })
}
