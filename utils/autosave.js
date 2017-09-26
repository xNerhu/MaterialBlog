const fs = require('fs')
const { upload, autoSaveDirectory } = require('../config')
const archiver = require('archiver')

const savePosts = (defaultDb) => {
  const usersCollection = defaultDb.collection('users')
  const postsCollection = defaultDb.collection('posts')
  const categoriesCollection = defaultDb.collection('categories')
  let daysCollection = defaultDb.collection('lessons-plan-days')
  let hoursCollection = defaultDb.collection('lessons-plan-hours')

  usersCollection.find({}).toArray((err, users) => {
    if (err) return console.log(err)

    postsCollection.find({}).sort({date: -1}).toArray((err, posts) => {
      if (err) return console.log(err)

      categoriesCollection.find({}).sort({date: -1}).toArray((err, categories) => {
        if (err) return console.log(err)

        daysCollection.find({}).sort({_id: 1}).toArray((err, days) => {
          if (err) return console.log(err)

          hoursCollection.find({}).sort({_id: 1}).toArray((err, hours) => {
            if (err) return console.log(err)

            const actualDate = new Date()
            const dir = `${actualDate.getDate()}.${actualDate.getMonth() + 1}.${actualDate.getFullYear()}`
            const path = `${autoSaveDirectory}${dir}`

            const output = fs.createWriteStream(`${path}.zip`)
            const archive = archiver('zip', {
              zlib: {
                level: 9
              }
            })

            output.on('close', () => {
              console.log('Saved')
            })

            archive.on('warning', (err) => {
              if (err.code !== 'ENOENT') throw err
            })

            archive.on('error', (err) => {
              throw err
            })

            archive.pipe(output)

            archive.append(JSON.stringify(posts), {
              name: 'users.json'
            })
            archive.append(JSON.stringify(posts), {
              name: 'posts.json'
            })
            archive.append(JSON.stringify(categories), {
              name: 'categories.json'
            })
            archive.append(JSON.stringify(days), {
              name: 'days.json'
            })
            archive.append(JSON.stringify(hours), {
              name: 'hours.json'
            })

            archive.directory(upload.directory, false)

            archive.finalize()
          })
        })
      })
    })
  })
}

module.exports = {
  savePosts: savePosts
}
