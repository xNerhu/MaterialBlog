import React from 'react'

export default class Picture extends React.Component {
  componentDidMount () {
    var self = this
    var img = new Image()

    /**
     * On img load event.
     */
    img.onload = function () {
      self.refs.pic.src = this.src
      self.refs.pic.style.opacity = '1'
    }

    /**
     * On img error event.
     * @param {Object} error data.
     */
    img.onerror = function (err) {
      console.log('Component: Picture')
    }

    img.src = this.props.image
  }

  render () {
    return (
      <img onClick={(e) => this.props.onClick(e, this.props.image)} ref='pic' className='picture' onMouseDown={this.onMouseDown} />
    )
  }
}
