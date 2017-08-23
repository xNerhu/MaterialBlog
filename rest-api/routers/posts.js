const { posts } = require('../config')
const {ObjectId} = require('mongodb')
const date = require('../helpers/date')

module.exports = (app, defaultDb) => {
  // Gets posts.
  app.get('/get-posts', (req, res) => {
    try {
      let loadAll = req.query.all
      if (loadAll == null) loadAll = false

      let page = req.query.page
      if (page == null) page = 0

      const limit = (!loadAll) ? posts.postsPerPage : 0
      const skip = (!loadAll) ? (page * posts.postsPerPage) : 0

      let collection = defaultDb.collection('posts')

      collection.find({}).sort({$natural: -1}).limit(limit).skip(skip).toArray((err, results) => {
        if (err) {
          res.json({
            message: err,
            success: false
          })

          console.error(err)
        } else {
          res.json(results)
        }
      })
    } catch (err) {
      res.json({
        message: err.message,
        success: false
      })
    }
  })

  // Adds post.
  app.post('/add-post', (req, res) => {
    try {
      const {
        title,
        content,
        media,
        userID
      } = req.body

      let collection = defaultDb.collection('posts')

      collection.insert({
        title: title,
        content: content,
        media: media,
        userID: userID,
        date: date.getActualDate()
      }, (err) => {
        if (err) {
          res.send({
            message: err,
            success: false
          })

          console.error(err)
        } else {
          res.send({
            message: 'Post has been added',
            success: true
          })
        }
      })
    } catch (err) {
      res.json({
        message: err.message,
        success: false
      })
    }
  })

  // Edits post.
  app.post('/edit-post', (req, res) => {
    try {
      const {
        id,
        title,
        content,
        media
      } = req.body

      let collection = defaultDb.collection('posts')

      collection.update({_id: ObjectId(id)}, {
        title: title,
        content: content,
        media: media
      }, (err, results) => {
        if (err) {
          res.json({
            message: err,
            success: false
          })

          console.error(err)
        } else {
          res.json({
            message: 'Post has been saved',
            success: true
          })
        }
      })
    } catch (err) {
      res.json({
        message: err.message,
        success: false
      })
    }
  })

  // Deletes post.
  app.post('/delete-post', (req, res) => {
    try {
      const id = req.body.id

      let collection = defaultDb.collection('posts')

      collection.remove({_id: ObjectId(id)}, (err, results) => {
        if (err) {
          res.json({
            message: err,
            success: false
          })

          console.error(err)
        } else {
          res.json({
            message: 'Post has been deleted',
            success: true
          })
        }
      })
    } catch (err) {
      res.json({
        message: err.message,
        success: false
      })
    }
  })

  // Deletes all posts.
  app.post('/delete-all-posts', (req, res) => {
    let collection = defaultDb.collection('posts')

    collection.remove({}, err => {
      if (err) {
        res.json({
          message: err,
          success: false
        })

        console.error(err)
      } else {
        res.json({
          message: 'Posts have been deleted',
          success: true
        })
      }
    })
  })
}
