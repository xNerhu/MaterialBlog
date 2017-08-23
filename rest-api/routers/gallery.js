const { gallery } = require('../config')
const {ObjectId} = require('mongodb')
const fs = require('fs')
const date = require('../helpers/date')
const Img = require('../helpers/img')
const Directory = require('../helpers/directory')

module.exports = (app, defaultDb) => {
  // Gets categories.
  app.get('/get-categories', (req, res) => {
    let collection = defaultDb.collection('categories')

    collection.find({}).sort({$natural: -1}).toArray((err, results) => {
      if (err) {
        res.json({
          message: err,
          success: false
        })

        console.log(err)
      } else {
        res.json(results)
      }
    })
  })

  // Adds category.
  app.post('/add-category', (req, res) => {
    try {
      if (req.body.name.length < 1) {
        return res.send({
          message: 'name_empty',
          success: false
        })
      } else {
        let collection = defaultDb.collection('categories')

        collection.insert({
          name: req.body.name,
          date: date.getActualDate(),
          pictures: [],
          userID: null
        }, (err, result) => {
          if (err) {
            res.send({
              message: err,
              success: false
            })

            console.error(err)
          } else {
            const id = result.ops[0]._id

            if (id == null) {
              return res.send({
                message: 'ID is undefined',
                success: false
              })
            }

            if (!fs.existsSync(gallery.uploadDirectory)) {
              fs.mkdirSync(gallery.uploadDirectory)
            }

            const path = `${gallery.uploadDirectory}/${id}`

            if (!fs.existsSync(path)) {
              fs.mkdirSync(path)
            }

            res.send({
              message: 'Category has been added',
              success: true
            })
          }
        })
      }
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
      let messages = []

      if (req.body.id.length < 1) {
        messages.push('id_empty')
      }

      if (req.body.title.length < 1) {
        messages.push('title_empty')
      }

      if (messages.length > 0) {
        return res.send({
          message: messages,
          success: false
        })
      }

      let collection = defaultDb.collection('categories')

      collection.update({_id: ObjectId(req.body.id)}, {
        title: req.body.title
      }, (err, results) => {
        if (err) {
          res.json({
            message: err,
            success: false
          })

          console.error(err)
        } else {
          res.json({
            message: 'Category has been saved',
            success: true
          })
        }
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
      if (req.body.id.length < 1) {
        return res.send({
          message: 'id_empty',
          success: false
        })
      }

      let collection = defaultDb.collection('categories')

      collection.remove({_id: ObjectId(req.body.id)}, (err, results) => {
        if (err) {
          res.json({
            message: err,
            success: false
          })

          console.error(err)
        } else {
          const path = `${gallery.uploadDirectory}/${req.body.id}`

          if (fs.existsSync(path)) {
            Directory.rm(path)
          }

          res.json({
            message: 'Category has been deleted',
            success: true
          })
        }
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
      let messages = []

      if (req.body.id.length < 1) {
        messages.push('id_empty')
      }

      if (req.body.picture.length < 1) {
        messages.push('picture_empty')
      }

      if (messages.length > 0) {
        return res({
          message: messages,
          success: false
        })
      }

      const date = new Date()

      // Create unique file name
      const fileName = date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '-' + date.getMilliseconds()

      const path = `${gallery.uploadDirectory}/${req.body.id}/${fileName}`

      const fullPath = Img.saveBase64ToFile(req.body.picture, path)

      let collection = defaultDb.collection('categories')

      collection.update({_id: ObjectId(req.body.id)}, {
        $push: {
          pictures: fullPath
        }
      }, (err) => {
        if (err) {
          return res.send({
            message: err,
            success: false
          })
        }
      })

      res.send({
        message: 'Picture has been uploaded',
        success: true
      })
    } catch (e) {
      res.send({
        message: e.message,
        success: false
      })
    }
  })
}
