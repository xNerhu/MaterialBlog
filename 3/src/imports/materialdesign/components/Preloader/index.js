export default class Preloader {
  constructor (strokeColor = '#03a9f4', strokeWidth = 4) {
    this.elements = {}
    this.props = {
      strokeColor: strokeColor,
      strokeWidth: strokeWidth
    }

    this.render()
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'material-preloader'

    this.elements.svg = document.createElement('svg')
    this.elements.svg.setAttributes({
      class: 'preloader-determinate',
      viewBox: '25 25 50 50'
    })

    this.elements.circle = document.createElement('circle')
    this.elements.circle.className = 'path'
    this.elements.circle.style.stroke = this.props.strokeColor
    this.elements.circle.style.strokeWidth = this.props.strokeWidth

    this.elements.circle.setAttributes({
      class: 'path',
      cx: '50',
      cy: '50',
      r: '20',
      fill: 'none',
      'stroke-miterlimit': '10'
    })

    this.elements.svg.appendChild(this.elements.circle)
    this.elements.root.innerHTML = this.elements.svg.outerHTML
  }
}
