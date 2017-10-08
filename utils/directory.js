const fs = require('fs')

/**
 * Deletes directory and all files in it.
 * @param {String} dir path
 * @param {Boolean} delete dir on end (optional)
 */
const rm = (path, deleteDir = true) => {
  try {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        const filePath = path + '/' + files[i]

        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath)
        } else {
          rm(filePath)
        }
      }
    }

    if (deleteDir) fs.rmdirSync(path)

    return true
  } catch (e) {
    return console.error(e)
  }
}

const createIfNotExists = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}

module.exports = {
  rm: rm,
  createIfNotExists: createIfNotExists
}
