import React from 'react'

export default class AboutClass extends React.Component {
  render () {
    return (
      <div className='page' ref='root'>
        o klasie
      </div>
    )
  }
}

AboutClass.defaultProps = {
  title: 'O klasie',
  url: 'aboutclass'
}
