export default class Preloader {
  constructor (strokeColor, strokeWidth) {
    this.elements = {}

    this.render(strokeColor, strokeWidth)
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Adds elements.
   * @param {String} stroke color.
   * @param {Int} stroke width.
   */
  render = (strokeColor = '#03a9f4', strokeWidth = 4) => {
    this.elements.root = document.createElement('svg')
    this.elements.root.setAttributes({
      class: 'preloader-determinate',
      viewBox: '25 25 50 50'
    })

    this.elements.circle = document.createElement('circle')
    this.elements.circle.className = 'path'
    this.elements.circle.style.stroke = strokeColor
    this.elements.circle.style.strokeWidth = strokeWidth

    this.elements.circle.setAttributes({
      class: 'path',
      cx: '50',
      cy: '50',
      r: '20',
      fill: 'none',
      'stroke-miterlimit': '10'
    })

    this.elements.root.appendChild(this.elements.circle)
  }
}
