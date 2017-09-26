module.exports = (app) => {
  app.get('/panel/', (req, res) => {
    // If user is not logged
    if (!req.isAuthenticated()) {
      return res.redirect('/login')
    } else if (req.user.moderator) { // If user is logged and is moderator
      return res.render('index')
    }

    // Redirect to blog
    return res.redirect('/')
  })

  app.get('/panel/:page', (req, res) => {
    const split = req.originalUrl.split('/')
    const page = split[split.length - 1]

    if (!req.isAuthenticated() || page === 'login') {
      return res.redirect('/login')
    } else if (req.user.moderator) {
      return res.render('index')
    }

    return res.redirect('/')
  })
}
