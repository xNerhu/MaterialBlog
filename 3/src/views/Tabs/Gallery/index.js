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
    const app = window.app
    app.tabsLoaded.gallery = true

    // TODO: Make request
    setTimeout(function () {
      app.togglePreloader(false)
      app.isLoading = false

      console.log('load categories')
    }, 500)
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'gallery-tab tab-page'

    this.elements.root.innerHTML = 'Galeria'
  }
}
