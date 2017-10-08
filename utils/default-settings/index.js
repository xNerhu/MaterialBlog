const bcrypt = require('bcrypt')
const fs = require('fs')
const { upload } = require('../../config')
const Directory = require('../directory')

module.exports = resetToDefaultSettings = (defaultDb, callback) => {
  const usersCollection = defaultDb.collection('users')
  const postsCollection = defaultDb.collection('posts')
  const categoriesCollection = defaultDb.collection('categories')
  let daysCollection = defaultDb.collection('lessons-plan-days')
  let hoursCollection = defaultDb.collection('lessons-plan-hours')

  // Delete all users
  usersCollection.remove({}, (err) => {
    if (err) throw err

    // Hash admin's password
    bcrypt.hash('toor', 10, (err, hash) => {
      if (err) throw err

      // Delete all users avatars
      Directory.rm(`${upload.directory}${upload.avatars}`, false)

      // Insert admin account
      usersCollection.insert({
        login: 'root',
        username: 'Admin',
        email: 'user@website.domain',
        avatar: 'images/default-avatar.png',
        password: hash,
        admin: true,
        moderator: true,
        date: new Date()
      }, (err, adminAccount) => {
        if (err) throw err

        // Delete all posts pictures
        Directory.rm(`${upload.directory}${upload.posts}`, false)

        // Delete all posts
        postsCollection.remove({}, (err) => {
          if (err) throw err

          // Add example post
          postsCollection.insert({
            title: 'Example post',
            content: fs.readFileSync('utils/default-settings/example-post.txt', 'utf8'),
            media: '',
            author: adminAccount.ops[0]._id,
            comments: [],
            likes: [],
            date: new Date()
          }, (err) => {
            if (err) throw err

            // Delete all pictures from gallery
            Directory.rm(`${upload.directory}${upload.gallery}`, false)

            // Delete all categories and pictures
            categoriesCollection.remove({}, (err) => {
              if (err) throw err

              // Delete all lessons plan
              daysCollection.remove({}, (err) => {
                if (err) throw err

                let days = []

                for (var i = 0; i < 5; i++) {
                  days.push({
                    subjects: [
                      'Subject 1',
                      'Subject 2'
                    ]
                  })
                }

                daysCollection.insertMany(days, (err) => {
                  if (err) throw err

                  // Delete all lessons hours
                  hoursCollection.remove({}, (err) => {
                    if (err) throw err

                    const hours = [
                      {
                        start: new Date(0, 0, 0, 8, 0),
                        end: new Date(0, 0, 0, 8, 45)
                      },
                      {
                        start: new Date(0, 0, 0, 8, 50),
                        end: new Date(0, 0, 0, 9, 35)
                      },
                      {
                        start: new Date(0, 0, 0, 9, 40),
                        end: new Date(0, 0, 0, 10, 25)
                      },
                      {
                        start: new Date(0, 0, 0, 10, 30),
                        end: new Date(0, 0, 0, 11, 15)
                      }
                    ]

                    hoursCollection.insertMany(hours, (err) => {
                      if (err) throw err

                      callback()
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
}
