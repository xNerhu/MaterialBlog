export default class GalleryTab {
  constructor () {
    this.elements = {}

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
   * Loads categories.
   */
  load = () => {
    console.log('wrwr')
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'gallery-tab tab-page'

    this.elements.root.innerHTML = 'Galeria'
  }
}
