export default class AboutClassTab {
  constructor () {
    this.elements = {}

    this.render()
  }

  /**
   * Gets root
   * @param {DOMElement}
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * TODO
   */
  load = () => {
    const app = window.app
    const root = this.getRoot()

    app.tabsLoaded.aboutClass = true
    app.togglePreloader(false)
    app.isLoading = false
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'about-class-tab tab-page'

    this.elements.root.innerHTML = 'O klasie'
  }
}
