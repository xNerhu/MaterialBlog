import React from 'react'

import Cell from './components/Cell'

export default class PostsTable extends React.Component {
  render () {
    return (
      <table className='material-table' ref='table'>
        <thead>
          <tr>
            <th>
              Akcja
            </th>
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
        <tbody ref='tbody'>
          {
            this.props.posts.map((data, i) => {
              return <Cell key={i} data={data} />
            })
          }
        </tbody>
      </table>
    )
  }
}
