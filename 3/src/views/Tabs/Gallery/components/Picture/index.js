export default class Picture {
  constructor (url, onClick) {
    this.elements = {}
    this.props = {
      url: url,
      onClick: onClick
    }

    this.naturalWidth = 0
    this.naturalHeight = 0

    this.render()
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On click event.
   * @param {Event}
   */
  onClick = (e) => {
    if (typeof this.props.onClick === 'function') this.props.onClick(e, this)
  }

  render = () => {
    const self = this

    this.elements.root = document.createElement('img')
    this.elements.root.className = 'picture'
    this.elements.root.setAttribute('draggable', 'false')
    this.elements.root.addEventListener('click', this.onClick)
    this.elements.root.onload = function () {
      this.style.opacity = '1'
      self.naturalWidth = this.naturalWidth
      self.naturalHeight = this.naturalHeight
    }

    this.elements.root.src = this.props.url
  }
}
