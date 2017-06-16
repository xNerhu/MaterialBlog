import Component from '../../../../../helpers/Component'

import Cell from './components/Cell'

export default class DesktopTable extends Component {
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
    const tbody = this.elements.tbody

    for (var i = 0; i < posts.length; i++) {
      const cell = (
        <Cell data={posts[i]} />
      )

      this.renderComponents(cell, tbody)
    }
  }

  render () {
    return (
      <table className='material-table' ref='root'>
        <thead>
          <tr>
            <th />
            <th>
              ID
            </th>
            <th>
              Autor
            </th>
            <th>
              Data
            </th>
            <th>
              Komentarze
            </th>
            <th>
              Polubienia
            </th>
            <th>
              Tytuł
            </th>
            <th>
              Treść
            </th>
          </tr>
        </thead>
        <tbody ref='tbody' />
      </table>
    )
  }
}
