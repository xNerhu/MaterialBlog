export default class PostsTab {
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

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'posts-tab tab-page'

    this.elements.root.innerHTML = 'Posty'
  }
}
