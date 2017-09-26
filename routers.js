module.exports = (passport, app, defaultDb) => {
  require('./routers/auth')(app, defaultDb, passport)
  require('./routers/user')(app, defaultDb)
  require('./routers/pages')(app, defaultDb)
  require('./routers/panel')(app)
  require('./routers/posts')(app, defaultDb)
  require('./routers/gallery')(app, defaultDb)
  require('./routers/lessons-plan')(app, defaultDb)
  require('./routers/for-while')(app, defaultDb)

  app.get('*', (req, res) => {
    return res.render('index')
  })
}
