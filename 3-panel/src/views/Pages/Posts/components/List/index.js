import Component from '../../../../../helpers/Component'

import Item from './components/Item'

export default class List extends Component {
  beforeRender () {
    this.cells = []
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Gets mobile table.
   */
  getMobileTable = () => {
    return this
  }

  /**
   * Sets cells.
   * @param {Object} posts.
   */
  setCells = (posts) => {
    const root = this.getRoot()
    const tbody = this.elements.tbody

    for (var i = 0; i < posts.length; i++) {
      const cell = (
        <Item data={posts[i]} getMobileTable={this.getMobileTable} />
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

  render () {
    return (
      <div className='posts-table-list' ref='root' />
    )
  }
}
