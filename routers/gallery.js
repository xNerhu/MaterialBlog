const { upload } = require('../config')
const {ObjectId} = require('mongodb')
const fs = require('fs')
const Img = require('../utils/img')
const Directory = require('../utils/directory')

module.exports = (app, defaultDb) => {
  // Gets categories.
  app.get('/get-categories', (req, res) => {
    let collection = defaultDb.collection('categories')

    collection.find({}).sort({date: -1}).toArray((err, results) => {
      if (err) return res.json({message: err, success: false})

      res.json(results)
    })
  })

  // Adds category.
  app.post('/add-category', (req, res) => {
    try {
      if (!req.user.moderator) {
        return res.send({message: 'User is not post author!', success: false})
      }

      if (req.body.title.length < 1) return res.send({message: 'empty_title', success: false})
      if (req.body.title.length > 30) return res.send({message: 'too_long_title', success: false})

      let collection = defaultDb.collection('categories')

      collection.insert({
        title: req.body.title,
        date: new Date(),
        pictures: []
      }, (err, result) => {
        if (err) return res.json({message: err, success: false})

        const _id = result.ops[0]._id
        const path = upload.directory + upload.gallery + _id

        if (!fs.existsSync(path)) fs.mkdirSync(path)

        res.send({
          message: 'Category has been added',
          success: true,
          data: {
            _id: _id
          }
        })
      })
    } catch (e) {
      res.send({
        message: e.message,
        success: false
      })
    }
  })

  // Edites category.
  app.post('/edit-category', (req, res) => {
    try {
      if (!req.user.moderator) {
        return res.send({message: 'User is not post author!', success: false})
      }

      if (req.body._id.length < 1) return res.json({message: 'empty_id', success: false})
      if (req.body.title.length < 1) return res.json({message: 'empty_title', success: false})
      if (req.body.title.length > 30) return res.json({message: 'too_long_title', success: false})

      let collection = defaultDb.collection('categories')

      collection.update({_id: ObjectId(req.body._id)}, {
        $set: {
          title: req.body.title
        }
      }, (err) => {
        if (err) return res.json({message: err, success: false})

        res.json({
          message: 'Category has been saved',
          success: true
        })
      })
    } catch (e) {
      res.send({
        message: e.message,
        success: false
      })
    }
  })

  // Deletes category.
  app.post('/delete-category', (req, res) => {
    try {
      if (!req.user.moderator) {
        return res.send({message: 'User is not post author!', success: false})
      }

      if (req.body._id.length < 1) return res.json({message: 'empty_id', success: false})

      let collection = defaultDb.collection('categories')

      collection.remove({_id: ObjectId(req.body._id)}, (err) => {
        if (err) return res.json({message: err, success: false})

        const path = upload.directory + upload.gallery + req.body._id

        if (fs.existsSync(path)) Directory.rm(path)

        res.json({
          message: 'Category has been deleted',
          success: true
        })
      })
    } catch (e) {
      res.send({
        message: e.message,
        success: false
      })
    }
  })

  // Uploads picture.
  app.post('/upload-picture', (req, res) => {
    try {
      if (!req.user.moderator) {
        return res.send({message: 'User is not post author!', success: false})
      }

      if (req.body._id.length < 1) return res.json({message: 'empty_id', success: false})
      if (req.body.picture.length < 1) return res.json({message: 'empty_picture', success: false})

      const date = new Date()

      // Create unique file name
      const fileName = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`

      const path = upload.directory + upload.gallery + req.body._id + '/' + fileName

      const fullPath = Img.saveBase64ToFile(req.body.picture, path)

      let collection = defaultDb.collection('categories')

      collection.update({_id: ObjectId(req.body._id)}, {
        $push: {
          pictures: fullPath
        }
      }, (err) => {
        if (err) return res.json({message: err, success: false})

        res.send({
          message: 'Picture has been uploaded',
          success: true,
          data: {
            url: fullPath
          }
        })
      })
    } catch (e) {
      res.send({
        message: e.message,
        success: false
      })
    }
  })

  // Deletes picture.
  app.post('/delete-picture', (req, res) => {
    try {
      if (!req.user.moderator) {
        return res.send({message: 'User is not post author!', success: false})
      }

      if (req.body._id.length < 1) return res.json({message: 'empty_id', success: false})
      if (req.body.picture.length < 1) return res.json({message: 'empty_picture', success: false})

      let collection = defaultDb.collection('categories')

      if (fs.existsSync(req.body.picture)) fs.unlink(req.body.picture)

      collection.update({_id: ObjectId(req.body._id)}, {
        $pull: {
          pictures: req.body.picture
        }
      }, (err) => {
        if (err) res.send({message: err, success: false})

        res.send({message: 'Picture has been deleted', success: true})
      })
    } catch (e) {
      res.send({
        message: e.message,
        success: false
      })
    }
  })
}
