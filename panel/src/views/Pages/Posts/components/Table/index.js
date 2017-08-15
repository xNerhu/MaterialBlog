import Component from '../../../../../helpers/Component'

import Cell from './components/Cell'

export default class Table extends Component {
  beforeRender () {
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
   * @param {Object} posts data
   */
  setCells (posts) {
    this.cells = []
    this.elements.tbody.innerHTML = ''

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
      const tbody = this.elements.tbody

      const cell = (
        <Cell data={data} getDesktopTable={() => { return this }} />
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
