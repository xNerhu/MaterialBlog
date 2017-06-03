import React from 'react'

import Cell from './components/Cell'

import Checkbox from '../../../../../imports/materialdesign/components/Checkbox'

export default class PostsMobile extends React.Component {
  render () {
    return (
      <div className='posts-table-mobile-item'>
        <div className='posts-table-mobile-item-cell posts-table-mobile-item-cell-checkbox'>
          <div className='posts-table-mobile-item-cell-title'>
            AKCJA
          </div>
          <div className='posts-table-mobile-item-cell-text'>
            <Checkbox onColor='#3F51B5' />
          </div>
        </div>
        <Cell title='ID' content={this.props.data.id} />
        <Cell title='Author' content={this.props.data.author} />
        <Cell title='Data' content={this.props.data.date} />
        <Cell title='Komentarze' content={this.props.data.comments.length} />
        <Cell title='Polubienia' content={this.props.data.likes.length} />
        <Cell title='Tytuł' content={this.props.data.title} />
        <Cell title='Treść' content={this.props.data.content} />
      </div>
    )
  }
}
