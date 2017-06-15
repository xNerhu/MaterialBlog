import Component from '../../../../../helpers/Component'

import Item from './components/Item'

export default class MobileTable extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
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
        <Item data={posts[i]} />
      )

      this.renderComponents(cell, root)
    }
  }

  render () {
    return (
      <div className='posts-table-mobile' ref='root' />
    )
  }
}
