module.exports = (app, defaultDb) => {
  app.route('/pages')
  .get((req, res) => {
    isAuthenticated(req)

    let collection = defaultDb.collection('pages')

    collection.find({}).toArray((err, items) => {
      if (err) console.error(err)

      res.send(items)
    })
  })
}
