export default class Colors {
  /**
   * Calculates foreground color based on background color
   * @param {string} color
   * @return {string}
   */
  static getForegroundColor (color) {
    var brightness = Colors.colorBrightness(color)
    if (brightness < 125) {
      return 'white'
    } else {
      return 'black'
    }
  }

  /**
   * Extracts brightness from color.
   * @param {string} color
   * @return {Number} - the brightness
   */
  static colorBrightness (color) {
    var r
    var g
    var b
    var brightness
    var colour = color
    if (colour.match(/^rgb/)) {
      colour = colour.match(/rgba?\(([^)]+)\)/)[1]
      colour = colour.split(/ *, */).map(Number)
      r = colour[0]
      g = colour[1]
      b = colour[2]
    } else if (colour[0] === '#' && colour.length === 7) {
      r = parseInt(colour.slice(1, 3), 16)
      g = parseInt(colour.slice(3, 5), 16)
      b = parseInt(colour.slice(5, 7), 16)
    } else if (colour[0] === '#' && colour.length === 4) {
      r = parseInt(colour[1] + colour[1], 16)
      g = parseInt(colour[2] + colour[2], 16)
      b = parseInt(colour[3] + colour[3], 16)
    }
    brightness = (r * 299 + g * 587 + b * 114) / 1000

    return brightness
  }

  /**
   * Converts hex color to RGB.
   * @param {string} hex
   * @return {object} rgb
   */
  static hexToRgb (hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b
    })

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
      : null
  }

  static componentToHex (c) {
    let hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  static rgbToHex (r, g, b) {
    return '#' + Colors.componentToHex(r) + Colors.componentToHex(g) + Colors.componentToHex(b)
  }

  static getColoredImage (r, g, b, a = 255, width = window.innerWidth, height = 48) {
    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    let ctx = canvas.getContext('2d')
    let imgData = ctx.createImageData(width, height)

    for (var i = 0; i < imgData.data.length; i += 4) {
      imgData.data[i] = r
      imgData.data[i + 1] = g
      imgData.data[i + 2] = b
      imgData.data[i + 3] = a
    }

    ctx.putImageData(imgData, 0, 0)

    return canvas.toDataURL('image/jpeg')
  }
}
