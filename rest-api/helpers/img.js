const fs = require('fs')

/**
 * Parses image to base 64 string.
 * @param {String} image path
 * @return {String} base64
 */
const getBase64 = function (file) {
  return new Buffer(fs.readFileSync(file)).toString('base64')
}

/**
 * Saves base64 string to image.
 * @param {String} base 64
 * @param {String} file path
 */
const saveBase64ToFile = function (base64, filePath) {
  const extension = base64.substring('data:image/'.length, base64.indexOf('base64') - 1)
  const path = filePath + '.' + extension

  base64 = base64.replace(/^data:image\/\w+;base64,/, '')
  fs.writeFileSync(path, new Buffer(base64, 'base64'))

  return path
}

module.exports = {
  getBase64: getBase64,
  saveBase64ToFile: saveBase64ToFile
}
