/**
 * Creates div element.
 * @param {Object} data
 * @param {DOMElement} parent
 */
function div (data = {}, parent = null) {
  let element = document.createElement('div')
  Object.assign(element, data)
  if (parent != null) parent.appendChild(element)
  return element
}

/**
 * Creates element.
 * @param {String} type
 * @param {Object} data
 * @param {DOMElement} parent
 */
function createElement (type, data = {}, parent = null) {
  let element = document.createElement(type)
  Object.assign(element, data)
  if (parent != null) parent.appendChild(element)
  return element
}

/**
 * Changes style attribute or gets value of the attribute.
 * @param {Object | String} data
 * @param {*} value
 * @return {*}
 */
Element.prototype.css = function (data, value = null) {
  if (typeof data === 'object') {
    for (var key in data) {
      if (key === 'top' || key === 'bottom' || key === 'left' || key === 'right' || key === 'width' || key === 'height' || key.indexOf('margin') !== -1) {
        if (typeof data[key] === 'number') {
          data[key] = data[key].toString() + 'px'
        }
      }
    }
    Object.assign(this.style, data)
  } else if (typeof data === 'string') {
    if (value != null) {
      if (data === 'top' || data === 'bottom' || data === 'left' || data === 'right' || data === 'width' || data === 'height' || data.indexOf('margin') !== -1) {
        if (typeof value === 'number') {
          value = value.toString() + 'px'
        }
      }
      this.style[data] = value
    } else {
      if (this.currentStyle)
          return this.currentStyle[data]

      return document.defaultView.getComputedStyle(this, null)[data]
    }
  }
  return null
}

Element.prototype.setStyle = function (data) {
  const keys = Object.keys(data)
  let str = ''

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    const value = data[key]
    const split = [
      'fontSize',
      'marginTop',
      'marginLeft',
      'marginBottom',
      'marginRight',
      'backgroundColor',
      'backgroundImage'
    ]

    for (let s = 0; s < split.length; s++) {
      const _split = split[s]

      if (_split === key) {
        for (let l = 0; l < _split.length; l++) {
          if (_split[l] === _split[l].toUpperCase()) {
            key = key.splice(l, 0, '-')
            break
          }
        }
        break
      }
    }

    key = key.toLowerCase()

    str += key + ':' + value + ';'
  }

  this.style = str
}

function parseStyleObjectToString (data) {
  const keys = Object.keys(data)
  let str = ''

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    const value = data[key]
    const split = [
      'fontSize',
      'marginTop',
      'marginLeft',
      'marginBottom',
      'marginRight',
      'backgroundColor',
      'backgroundImage'
    ]

    for (let s = 0; s < split.length; s++) {
      const _split = split[s]

      if (_split === key) {
        for (let l = 0; l < _split.length; l++) {
          if (_split[l] === _split[l].toUpperCase()) {
            key = key.splice(l, 0, '-')
            break
          }
        }
        break
      }
    }

    key = key.toLowerCase()

    str += key + ':' + value + ';'
  }

  return str
}

String.prototype.splice = function (idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem))
}

Element.prototype.remove = function () {
  this.parentNode.removeChild(this)
}

Element.prototype.setAttributes = function (attributes) {
  const keys = Object.keys(attributes)

  for (let i = 0; i < keys.length; i++) {
    const attr = keys[i]
    const value = attributes[keys[i]]

    this.setAttribute(attr, value)
  }
}

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
