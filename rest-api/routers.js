module.exports = (passport, app, defaultDb) => {
  require('./routers/auth')(app, defaultDb, passport)
  require('./routers/posts')(app, defaultDb)
  require('./routers/gallery')(app, defaultDb)
}
