import React from 'react'

export default class Item extends React.Component {
  componentDidMount () {
    const self = this

    const until = ((this.props.index + 1) * 0.075) * 1000
    setTimeout(function () {
      self.refs.root.style.opacity = '1'
    }, until)

    this.props.getSearchResults().items.push(this.refs.root)
  }

  render () {
    const link = '/?post=' + this.props.data.id

    return (
      <div className='search-results-item' ref='root'>
        <a href={link} className='search-results-item-title'>
          {this.props.data.title}
        </a>
        <div className='search-results-item-content'>
          {this.props.data.text}
        </div>
        <div className='search-results-item-info'>
          <span className='search-results-item-info-author'>{this.props.data.author}</span>, {this.props.data.date}
        </div>
      </div>
    )
  }
}
