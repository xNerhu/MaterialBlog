const bcrypt = require('bcrypt')
const Img = require('../helpers/img.js')

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
          avatar: base64
        })
      })
    })(req, res, next)
  })

  /**
   * Logouts user.
   */
  app.get('/logout', (req, res) => {
    req.logout()
    res.send({success: true})
  })

  /** Registers user.
   * Type post.
   * Body params:
   * @param {String} login
   * @param {String} username
   * @param {String} email
   * @param {String} avatar
   * @param {String} password
   */
  app.post('/register', (req, res) => {
    let collection = defaultDb.collection('users')

    let messages = []

    // Check login
    if (req.body.login.length < 1) {
      messages.push('login_empty')
    } else if (req.body.login.length <= 4) {
      messages.push('login_incorrect')
    }

    // Check email
    if (req.body.email.length < 1) {
      messages.push('email_empty')
    } else if (req.body.email.length <= 5 || req.body.email.indexOf('@') < 0) {
      messages.push('email_incorrect')
    }

    // Check username
    if (req.body.username.length < 1) {
      messages.push('username_empty')
    }

    // Check password
    if (req.body.password.length < 1) {
      messages.push('password_empty')
    } else if (req.body.password.length <= 4) {
      messages.push('password_incorrect')
    }

    // Return errors
    if (messages.length > 0) {
      res.send({
        message: messages,
        success: false
      })

      return
    } else {
      // Check if exists user with same login
      collection.findOne({login: req.body.login}, (err, user) => {
        if (err) return messages.push(err)

        let userExists = false

        // If results then user exists
        if (user) userExists = true

        // Check if exists user with same email
        collection.findOne({email: req.body.email}, (err, user) => {
          if (err) return messages.push(err)

          if (userExists) {
            messages.push('email_exists')
          }

          if (user) {
            messages.push('login_exists')
            userExists = true
          }

          // If user exists return errors
          if (userExists) {
            res.send({
              message: messages,
              success: false
            })

            return
          } else {
            // Default avatar
            let avatar = 'images/default-avatar.png'

            // If avatar is given then replace with default
            if (req.body.avatar != null) {
              if (req.body.avatar.length > 0) {
                avatar = req.body.avatar
              }
            }

            // Hash password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) return messages.push(err)

              // Add user to database
              collection.insertOne({
                login: req.body.login,
                username: req.body.username,
                email: req.body.email,
                avatar: avatar,
                password: hash
              }, (err, user) => {
                if (err) return messages.push(err)

                // Log user
                req.login({
                  login: req.body.login,
                  password: req.body.password
                }, (err) => {
                  if (err) return messages.push(err)

                  // Return data
                  return res.send({
                    success: true,
                    id: user.ops[0]._id
                  })
                })
              })
            })
          }
        })
      })
    }
  })
}
