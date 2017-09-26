const fs = require('fs')
const path = require('path')

/**
 * Parses image to base 64 string.
 * @param {String} image path
 * @return {String} base64
 */
const getBase64 = (file) => {
  const extension = path.extname(file).split('.').pop()
  const base64Header = `data:image/${extension};base64,`

  return base64Header + (new Buffer(fs.readFileSync(file)).toString('base64'))
}

/**
 * Saves base64 string to image.
 * @param {String} base 64
 * @param {String} file path
 */
const saveBase64ToFile = (base64, filePath) => {
  let extension = base64.substring('data:image/'.length, base64.indexOf('base64') - 1)
  if (extension === 'jpeg') extension = 'jpg'

  const path = filePath + '.' + extension
  if (path.includes('false')) return ''

  base64 = base64.replace(/^data:image\/\w+;base64,/, '')
  fs.writeFileSync(path, new Buffer(base64, 'base64'))

  return path
}

const deleteAllPictures = (filePath) => {
  const extensions = [
    'jpg',
    'png',
    'gif'
  ]

  for (var i = 0; i < extensions.length; i++) {
    const path = filePath + '.' + extensions[i]
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }
  }
}

module.exports = {
  getBase64: getBase64,
  saveBase64ToFile: saveBase64ToFile,
  deleteAllPictures: deleteAllPictures
}
