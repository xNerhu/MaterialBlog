const {ObjectId} = require('mongodb')
const { upload } = require('../config.js')

module.exports = (app, defaultDb) => {
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

  app.get('/users', (req, res) => {
    let collection = defaultDb.collection('users')

    collection.find({}).sort({date: -1}).toArray((err, results) => {
      res.send(results)
    })
  })

  app.get('/delete-users', (req, res) => {
    let collection = defaultDb.collection('users')

    collection.remove({admin: false}, (err, results) => {
      if (err) console.log(err)
      res.send({success: true})
    })
  })

  app.post('/delete-posts', (req, res) => {
    let collection = defaultDb.collection('posts')

    collection.remove({}, (err, results) => {
      if (err) console.log(err)
      res.send({success: true})
    })
  })

  app.get('/posts', (req, res) => {
    let collection = defaultDb.collection('posts')

    collection.find({}).sort({date: -1}).toArray((err, results) => {
      if (err) console.log(err)
      res.send(results)
    })
  })

  app.post('/set-user-moderator', (req, res) => {
    let collection = defaultDb.collection('users')

    collection.update({_id: ObjectId(req.body.user)}, {
      $set: {
        moderator: (req.body.flag === 'true')
      }
    }, (err, results) => {
      if (err) console.log(err)
      res.send({success: true})
    })
  })

  app.post('/set-all-users-moderator', (req, res) => {
    let collection = defaultDb.collection('users')

    collection.update({moderator: false}, {
      $set: {
        moderator: true
      }
    }, (err, results) => {
      if (err) console.log(err)
      res.send({success: true})
    })
  })

  app.post('/delete-u', (req, res) => {
    const collection = defaultDb.collection('users')

    collection.remove({_id: ObjectId('59c22f8b78de8c3252671719')}, (err) => {
      if (err) return res.send({success: false})
      res.send({success: true})
    })
  })

  app.post('/set-user-avatar', (req, res) => {
    let collection = defaultDb.collection('users')

    collection.update({_id: ObjectId(req.body.user)}, {
      $set: {
        avatar: `${upload.directory}${upload.avatars}${req.body.user}.${req.body.avatar}`
      }
    }, (err, results) => {
      if (err) console.log(err)
      res.send({success: true})
    })
  })

  app.post('/test-posts', (req, res) => {
    let collection = defaultDb.collection('users')
    let postsCollection = defaultDb.collection('posts')

    collection.find({}).toArray((err, result) => {
      if (err) console.log(err)

      let posts = []

      for (var i = 0; i < result.length; i++) {
        posts.push({
          "title": "Test",
          "content": i,
          "author": result[i]._id,
          "date": new Date(),
          "comments": [],
          "likes": [],
          "media": ""
        })
      }

      postsCollection.insertMany(posts, (err) => {
        if (err) console.log(err)

        res.send({success: true})
      })
    })
  })

  app.post('/add-categories-2', (req, res) => {
    let collection = defaultDb.collection('categories')

    const categories = [
      {
        title: 'Warszawa',
        date: new Date(2017, 5, 2, 21, 2),
        pictures: []
      },
      {
        title: 'Zakończenie roku szkolnego',
        date: new Date(2017, 5, 22, 10, 56),
        pictures: []
      }
    ]

    collection.insertMany(categories, (err) => {
      if (err) console.log(err)
      res.send({success: true})
    })
  })

  app.post('/clear-p', (req, res) => {
    let collection = defaultDb.collection('posts')

    collection.remove({author: null})
  })

  app.post('/fix-posts', (req, res) => {
    let collection = defaultDb.collection('posts')

    collection.find({}).toArray((err, posts) => {
      let index = 0

      const fix = () => {
        if (index < posts.length) {
          collection.update({
            _id: posts[index]._id
          }, {
            $set: {
              date: new Date(posts[index].date)
            }
          }, (err) => {
            if (err) console.log(err)
            index++
            fix()
          })
        } else {
          console.log('done')
        }
      }

      fix()
    })
  })

  app.get('/ptest', (req, res) => {
    let collection = defaultDb.collection('posts')

    const actualDate = new Date()
    let year = actualDate.getFullYear()
    let month = actualDate.getMonth()

    month -= req.query.month

    if (month < 0) {
      year -= 1
      month = actualDate.getMonth()
    }

    collection.find({
      date: {
        $gte: new Date(2017, 1)
      },
      author: '59a573353ef17b1418c33c34'
    }).sort({date: -1}).toArray((err, results) => {
      if (err) console.log(err)
      res.send(results)
    })
  })
}
