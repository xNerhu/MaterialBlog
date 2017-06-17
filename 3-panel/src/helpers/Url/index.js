export default class Url {
  /**
   * Gets parametr from url
   * @param {String} parametr
   * @return {String} value of parametr
   */
  static getUrlParameter (r) {
    var t
    var e
    var n = decodeURIComponent(window.location.search.substring(1))
    var o = n.split('&')
    for (e = 0; e < o.length; e++) {
      if (t = o[e].split('='), t[0] === r) return void 0 === t[1] ? !0 : t[1]
    }

    return null
  }

  /**
   * Extracts file name from file path.
   * @param {String} path to file
   * @return {String} file name (with extension)
   */
  static extractFileName (path) {
    let startIndex = (path.indexOf('\\') >= 0 ? path.lastIndexOf('\\') : path.lastIndexOf('/'))
    let filename = path.substring(startIndex)

    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
      filename = filename.substring(1)
    }

    return filename
  }
}
