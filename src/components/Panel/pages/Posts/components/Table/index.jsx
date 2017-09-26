import Component from 'inferno-component'

import Cell from './components/Cell'

export default class Table extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      checkBoxes: false
    }

    this.items = []
  }

  render () {
    const className = `posts-table ${(this.state.checkBoxes) ? 'check-boxes' : ''}`

    return (
      <table className={className}>
        <thead>
          <tr>
            <th className='check-box-header' />
            <th className='id-header'>
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
            <th className='menu-icon-header' />
          </tr>
        </thead>
        <tbody>
          {
            this.props.posts.map((data) => {
              return <Cell data={data} table={this} />
            })
          }
        </tbody>
      </table>
    )
  }
}
