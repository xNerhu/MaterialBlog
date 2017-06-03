import React from 'react'

export default class Gallery extends React.Component {
  render () {
    return (
      <div className='page' ref='root'>
        Galeria
      </div>
    )
  }
}

Gallery.defaultProps = {
  title: 'Galeria',
  url: 'gallery'
}
