import Component from '../../../../../helpers/Component'

import Cell from './components/Cell'

export default class Table extends Component {
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
   * Gets desktop table.
   * @return {DekstopTable}
   */
  getDesktopTable = () => {
    return this
  }

  /**
   * Sets cells.
   * @param {Object} posts.
   */
  setCells = (posts) => {
    const tbody = this.elements.tbody

    for (var i = 0; i < posts.length; i++) {
      const cell = (
        <Cell data={posts[i]} getDesktopTable={this.getDesktopTable} />
      )

      this.renderComponents(cell, tbody)
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
      <table className='material-table' ref='root'>
        <thead>
          <tr>
            <th ref='checkboxCell' />
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
            <th className='picture-header'>
              Zdjęcie
            </th>
            <th>
              Tytuł
            </th>
            <th>
              Treść
            </th>
            <th ref='menuCell' />
          </tr>
        </thead>
        <tbody ref='tbody' />
      </table>
    )
  }
}
