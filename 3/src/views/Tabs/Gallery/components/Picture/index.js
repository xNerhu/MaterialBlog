export default class Picture {
  constructor (url) {
    this.elements = {}
    this.props = {
      url: url
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
    this.elements.root = document.createElement('img')
    this.elements.root.className = 'picture'
    this.elements.root.setAttribute('draggable', 'false')
    this.elements.root.onload = function () {
      this.style.opacity = '1'
    }
    this.elements.root.src = this.props.url
  }
}
