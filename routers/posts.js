const { posts } = require('../config')
const { ObjectId } = require('mongodb')
const DataFormater = require('../utils/date')
const Img = require('../utils/img')
const { upload } = require('../config.js')
const fs = require('fs')

module.exports = (app, defaultDb) => {
  // Gets posts.
  app.get('/get-posts', (req, res) => {
    const loadAllPosts = req.query.all
    const page = req.query.page || 0
    const author = req.query.user || 'all'
    let limit = (!loadAllPosts) ? posts.postsPerPage : 0
    let skip = (!loadAllPosts) ? (page * posts.postsPerPage) : 0
    const timePeriod = req.query.timeperiod

    let query = author !== 'all' && {
      author: author
    } || {}

    const actualDate = new Date()
    let year = actualDate.getFullYear()
    let month = actualDate.getMonth()
    if (timePeriod) {

      month -= timePeriod

      if (month < 0) {
        year -= 1
        month = actualDate.getMonth()
      }

      const dateQuery = {
        date: {
          $gte: new Date(year, month),
          $lt: new Date()
        }
      }

      limit = 0
      skip = 0

      query = Object.assign(dateQuery, query)
    }

    let postsCollection = defaultDb.collection('posts')
    let usersCollection = defaultDb.collection('users')

    postsCollection.find(query).sort({date: -1}).limit(limit).skip(skip).toArray((err, results) => {
      if (err) return res.json({message: err, success: false})

      let usersToFind = []
      let usersData = []
      let index = 0

      // Get all authors of posts and comments
      for (var i = 0; i < results.length; i++) {
        const post = results[i]
        const postAuthor = post.author

        if (usersToFind.indexOf(postAuthor) === -1) usersToFind.push(postAuthor)

        // Get all authors of comment in post
        for (var c = 0; c < post.comments.length; c++) {
          const commentAuthor = post.comments[c].author

          if (usersToFind.indexOf(commentAuthor) === -1) usersToFind.push(commentAuthor)
        }

        // Get all users that liked post
        for (var l = 0; l < post.likes.length; l++) {
          const user = post.likes[l]._userid

          if (usersToFind.indexOf(user) === -1) usersToFind.push(user)
        }
      }

      // Get author of post or comment info
      const getAuthorInfo = () => {
        if (index < usersToFind.length) {
          usersCollection.findOne({_id: ObjectId(usersToFind[index])}, (err, result) => {
            if (err) return res.json({message: err, success: false})

            usersData.push({
              username: result.username,
              avatar: result.avatar
            })

            index++
            getAuthorInfo()
          })
        } else {
          const isEditable = (author) => {
            return req.user != null && (author === req.user._id || req.user.admin)
          }

          // Set authors info
          for (var i = 0; i < results.length; i++) {
            results[i].authorInfo = usersData[usersToFind.indexOf(results[i].author)]
            results[i].date = DataFormater.format(new Date(results[i].date))

            results[i].editable = isEditable(results[i].author) && req.user.moderator
            results[i].likeable = (req.user != null)
            results[i].liked = false

            // Set users that liked post
            for (var f = 0; f < results[i].likes.length; f++) {
              results[i].likes[f].authorInfo = usersData[usersToFind.indexOf(results[i].likes[f]._userid)]

              if (req.user && results[i].likes[f]._userid === req.user._id) {
                results[i].liked = true
              }
            }

            // Set authors of comments
            for (var c = 0; c < results[i].comments.length; c++) {
              results[i].comments[c].authorInfo = usersData[usersToFind.indexOf(results[i].comments[c].author)]
              results[i].comments[c].editable = isEditable(results[i].comments[c].author)
            }
          }

          res.json(results)
        }
      }

      getAuthorInfo()
    })
  })

  // Adds post.
  app.post('/add-post', (req, res) => {
    try {
      let collection = defaultDb.collection('posts')

      if (req.user.moderator) {
        const {
          title,
          content,
          media
        } = req.body

        collection.insert({
          title: title,
          content: content,
          author: req.user._id,
          date: new Date(),
          comments: [],
          likes: [],
          media: ''
        }, (err, result) => {
          if (err) {
            res.send({
              message: err,
              success: false
            })

            return console.error(err)
          } else {
            const _id = result.ops[0]._id
            let mediaPath = ''

            if (media != null && media !== '') {
              const path = upload.directory + upload.posts + _id

              mediaPath = Img.saveBase64ToFile(media, path)

              collection.update({_id: _id}, {
                $set: {
                  media: mediaPath
                }
              })
            }

            res.send({
              message: 'Post has been added',
              success: true,
              data: {
                _id: _id,
                date: DataFormater.format(result.ops[0].date)
              }
            })
          }
        })
      } else {
        res.send({
          message: 'User is not a moderator',
          success: false
        })
      }
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
      let collection = defaultDb.collection('posts')

      const {
        _id,
        title,
        content,
        media
      } = req.body

      if (req.user.moderator) {
        if (_id == null || _id === '') {
          return res.json({
            message: 'ID is empty',
            success: false
          })
        }

        collection.findOne({_id: ObjectId(_id)}, (err, postResult) => {
          if (err) return console.error(err)

          if (postResult.author == req.user._id || req.user.admin) {
            const path = upload.directory + upload.posts + _id
            const isBase64 = (media.indexOf(upload.directory + upload.posts) < 0)
            const isMedia = (media != null && media !== '')
            let mediaPath = media

            // If media is base64
            if (isBase64 && isMedia) {
              // Delete all post medias
              Img.deleteAllPictures(path)
              // Get media path (with extension)
              mediaPath = Img.saveBase64ToFile(media, path)
            } else if (!isMedia) {
              Img.deleteAllPictures(path)
              mediaPath = ''
            }

            collection.update({_id: ObjectId(_id)}, {
              $set: {
                title: title,
                content: content,
                media: mediaPath
              }
            }, (err, results) => {
              if (err) {
                res.json({
                  message: err,
                  success: false
                })

                return console.error(err)
              } else {
                res.json({
                  message: 'Post has been saved',
                  success: true,
                  data: {
                    media: mediaPath
                  }
                })
              }
            })
          } else {
            res.send({
              message: 'User is not post author!',
              success: false
            })
          }
        })
      } else {
        res.send({
          message: 'User is not a moderator',
          success: false
        })
      }
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
      let collection = defaultDb.collection('posts')

      const _id = req.body._id

      if (req.user.moderator) {
        if (_id == null || _id === '') {
          return res.json({
            message: 'ID is empty',
            success: false
          })
        }

        collection.findOne({_id: ObjectId(_id)}, (err, postResult) => {
          if (err) return console.error(err)

          if (postResult.author == req.user._id || req.user.admin) {
            collection.remove({_id: ObjectId(_id)}, (err, results) => {
              if (err) {
                res.json({
                  message: err,
                  success: false
                })

                console.error(err)
              } else {
                // Delete all post medias
                const path = upload.directory + upload.posts + _id
                Img.deleteAllPictures(path)

                res.json({
                  message: 'Post has been deleted',
                  success: true
                })
              }
            })
          } else {
            res.send({
              message: 'User is not post author!',
              success: false
            })
          }
        })
      } else {
        res.send({
          message: 'User is not a moderator',
          success: false
        })
      }
    } catch (err) {
      res.json({
        message: err.message,
        success: false
      })
    }
  })

  /**
   * Adds comment to post.
   */
  app.post('/add-comment', (req, res) => {
    if (req.user == null) return res.json({message: 'User not logged', success: false})

    if (req.body._id == null || req.body._id === '') return res.json({message: 'postid_empty', success: false})
    if (req.body.content == null || req.body.content === '') return res.json({message: 'content_empty', success: false})

    let collection = defaultDb.collection('posts')

    let comment = {
      _id: new ObjectId(),
      date: new Date(),
      author: req.user._id,
      content: req.body.content
    }

    collection.update({_id: ObjectId(req.body._id)}, {
      $push: {
        comments: comment
      }
    }, (err, result) => {
      if (err) return res.json({message: err, sucess: false})

      comment.authorInfo = {
        username: req.user.username,
        avatar: req.user.avatar
      }
      comment.editable = true

      res.json({
        message: 'Comment have been added',
        success: true,
        data: comment
      })
    })
  })

  /**
   * Edits post comment.
   */
  app.post('/edit-comment', (req, res) => {
    if (req.user == null) return res.json({message: 'User not logged', success: false})

    if (req.body._id == null || req.body._id === '') return res.json({message: 'postid_empty', success: false})
    if (req.body.commentid == null || req.body.commentid === '') return res.json({message: 'commentid_empty', success: false})
    if (req.body.content == null || req.body.content === '') return res.json({message: 'content_empty', success: false})

    let collection = defaultDb.collection('posts')

    collection.findOne({
      _id: ObjectId(req.body._id)
    }, {
      comments: {
        $elemMatch: {
          _id: ObjectId(req.body.commentid)
        }
      }
    }, (err, result) => {
      const comment = result.comments[0]

      if (err) return res.json({message: err, sucess: false})
      if (comment.author !== req.user._id && !req.user.admin) return res.json({message: 'Logged user is not author of the comment', success: false})

      collection.update({
        'comments._id': ObjectId(req.body.commentid)
      }, {
        $set: {
          'comments.$.content': req.body.content
        }
      }, (err) => {
        if (err) return res.json({message: err, sucess: false})

        res.json({message: 'Comment has been edited', success: true})
      })
    })
  })

  /**
   * Deletes post comment.
   */
  app.post('/delete-comment', (req, res) => {
    if (req.user == null) return res.json({message: 'User not logged', success: false})

    if (req.body._id == null || req.body._id === '') return res.json({message: 'postid_empty', success: false})
    if (req.body.commentid == null || req.body.commentid === '') return res.json({message: 'commentid_empty', success: false})

    let collection = defaultDb.collection('posts')

    collection.findOne({
      _id: ObjectId(req.body._id)
    }, {
      comments: {
        $elemMatch: {
          _id: ObjectId(req.body.commentid)
        }
      }
    }, (err, result) => {
      const comment = result.comments[0]
      if (err) return res.json({message: err, sucess: false})
      if (comment.author !== req.user._id && !req.user.admin) return res.json({message: 'Logged user is not author of the comment', success: false})

      collection.update({
        _id: ObjectId(req.body._id)
      }, {
        $pull: {
          comments: {
            _id: ObjectId(req.body.commentid)
          }
        }
      }, (err) => {
        if (err) return res.json({message: err, sucess: false})

        res.json({message: 'Comment has been deleted', success: true})
      })
    })
  })

  /**
   * Liked post.
   */
  app.post('/like-post', (req, res) => {
    if (req.user == null) return res.json({message: 'User not logged', success: false})

    if (req.body._id == null || req.body._id === '') return res.json({message: 'postid_empty', success: false})

    let usersCollection = defaultDb.collection('users')
    let collection = defaultDb.collection('posts')

    collection.findOne({
      _id: ObjectId(req.body._id)
    }, (err, result) => {
      if (err) return res.json({message: err, sucess: false})

      let like = true
      let likeIndex = -1

      for (var i = 0; i < result.likes.length; i++) {
        if (result.likes[i]._userid === req.user._id) {
          like = false
          likeIndex = i
          break
        }
      }

      let likes = result.likes
      let usersToFind = []
      let usersData = []
      let index = 0

      for (var i = 0; i < likes.length; i++) {
        const user = likes[i]._userid

        if (usersToFind.indexOf(user) === -1) usersToFind.push(user)
      }

      // Return updated data
      let getUserInfo = () => {
        if (index < usersToFind.length) {
          usersCollection.findOne({_id: ObjectId(usersToFind[index])}, (err, result) => {
            if (err) return res.json({message: err, success: false})

            usersData.push({
              username: result.username
            })

            index++
            getUserInfo()
          })
        } else {
          // Set user info
          for (var i = 0; i < likes.length; i++) {
            likes[i].authorInfo = usersData[usersToFind.indexOf(likes[i]._userid)]
          }

          let query = {}

          if (like) {
            likes.push({
              _userid: req.user._id,
              authorInfo: {
                username: req.user.username
              }
            })

            query = {
              $push: {
                likes: {
                  _userid: req.user._id
                }
              }
            }
          } else {
            likes.splice(likeIndex, 1)

            query = {
              $pull: {
                likes: {
                  _userid: req.user._id
                }
              }
            }
          }

          collection.update({
            _id: ObjectId(req.body._id)
          }, query, (err) => {
            if (err) return res.json({message: err, sucess: false})

            res.json({
              message: (like) ? 'Liked post' : 'Unliked post',
              success: true,
              data: {
                liked: like,
                likes: likes
              }
            })
          })
        }
      }

      getUserInfo()
    })
  })
}
