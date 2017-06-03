import React from 'react'

export default class Posts extends React.Component {
  render () {
    return (
      <div className='page' ref='root'>
        Posty
      </div>
    )
  }
}

Posts.defaultProps = {
  title: 'Posty',
  url: 'posts'
}
