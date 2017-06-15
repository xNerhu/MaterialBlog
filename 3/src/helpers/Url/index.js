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
}
