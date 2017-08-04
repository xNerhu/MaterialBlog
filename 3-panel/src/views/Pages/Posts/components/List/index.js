import Component from '../../../../../helpers/Component'

import Item from './components/Item'

export default class List extends Component {
  beforeRender () {
    this.items = []
    this.cells = []

    this.toggledPictures = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Sets cells.
   * @param {Object} posts.
   */
  setCells (posts) {
    this.items = []
    this.cells = []
    this.getRoot().innerHTML = ''

    for (var i = 0; i < posts.length; i++) {
      this.addPost(posts[i])
    }
  }

  /**
   * Adds post to table.
   * @param {Object} post data.
   */
  addPost (data) {
    if (data.deleted !== true) {
      const root = this.getRoot()

      const cell = (
        <Item data={data} getMobileTable={() => { return this }} getItem={() => { return this }} />
      )

      this.renderComponents(cell, root)
    }
  }

  /**
   * Shows or hides checkboxes.
   * @param {Boolean}
   */
  toggleCheckBoxes (flag) {
    const root = this.getRoot()

    if (flag) {
      root.classList.add('checkboxes')
    } else {
      root.classList.remove('checkboxes')
    }
  }

  /**
   * Shows or hides pictures.
   * @param {Boolean}
   */
  togglePictures (flag) {
    const root = this.getRoot()

    if (flag) {
      root.classList.add('pictures')
    } else {
      root.classList.remove('pictures')
    }

    window.app.getPostsPage().toggledPictures = flag

    this.toggledPictures = flag
  }

  render () {
    return (
      <div className='posts-table-list' ref='root' />
    )
  }
}
