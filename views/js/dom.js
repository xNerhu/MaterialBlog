Array.prototype.move = function (oldIndex, newIndex) {
  if (oldIndex >= this.length) {
    var k = newIndex - this.length

    while ((k--) + 1) {
      this.push(undefined)
    }
  }
  this.splice(newIndex, 0, this.splice(oldIndex, 1)[0])
  return this
}

/**
 * Checks that element is visible on the screen.
 * @param {DOMElement}
 * @param {Boolean} visible
 */
function isVisibleOnScreen (element) {
  let rect = element.getBoundingClientRect()
  let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  let is = !(rect.bottom < 0 || rect.top - viewHeight >= 0)
  if (is && element.style.display === 'none') is = false
  return is
}

loadPictures = async (pictures) => {
  for (var i = 0; i < pictures.length; i++) {
    await this.loadPicture(pictures[i])
  }
}

loadPicture = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = resolve
    image.onerror = resolve

    image.src = url
  })
}
