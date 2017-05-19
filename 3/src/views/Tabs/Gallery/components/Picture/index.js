import React from 'react'

export default class Picture extends React.Component {
  componentDidMount () {
    var self = this
    var img = new Image()

    img.onload = function () {
      const width = this.width
      const height = this.height
      const vertical = self.props.isVertical(width, height)
      if (vertical) {
        self.refs.pic.style.transform = 'translateZ(0) rotate(90deg)'
      }
      self.refs.pic.src = this.src
      if (typeof self.props.onLoad === 'function') self.props.onLoad()
    }
    img.src = this.props.image
  }
  render () {
    // Styles.
    return (
      <img ref='pic' />
    )
  }
}
