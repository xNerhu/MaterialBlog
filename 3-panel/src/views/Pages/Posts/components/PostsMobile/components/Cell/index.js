import React from 'react'

export default class Cell extends React.Component {
  componentDidMount () {
    this.refs.content.innerHTML = this.props.content
  }

  render () {
    return (
      <div className='posts-table-mobile-item-cell'>
        <div className='posts-table-mobile-item-cell-title'>
          {
            this.props.title
          }
        </div>
        <div className='posts-table-mobile-item-cell-text' ref='content' />
      </div>
    )
  }
}
