const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

module.exports = (passport, defaultDb) => {
  passport.use(new LocalStrategy((username, password, done) => {
    let collection = defaultDb.collection('users')

    username = username.toLowerCase()

    let criteria = (username.indexOf('@') === -1) ? {login: username} : {email: username}

    collection.findOne(criteria, (err, user) => {
      if (err) return done(err)

      if (!user) {
        return done(null, false, { message: 'incorrect_username' })
      }

      bcrypt.compare(password, user.password, function (err, res) {
        if (res) {
          return done(null, user, { message: 'success' })
        } else {
          return done(null, false, { message: 'incorrect_password' })
        }
      })
    })
  }))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}
