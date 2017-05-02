import React from 'react'

export default class Picture extends React.Component {
  constructor () {
    super()

    this.state = {
      opacity: 0,
      isVertical: false,
      picFullWidth: 200
    }

    this.pictureWidth = 300
    this.pictureHeight = 200
  }

  componentDidMount () {
    var self = this
    var img = new Image()

    img.onload = function () {
      self.setState({
        opacity: 1
      })

      self.refs.picFull.style.backgroundImage = 'url(' + this.src + ')'

      if (self.props.isVertical(this.width, this.height)) {
        const width = self.props.getImageWidth(this.height, this.width, self.refs.pic.clientHeight) * 100 / self.pictureWidth

        self.refs.picBackground.style.backgroundImage = 'url(' + this.src + ')'
        self.setState({
          isVertical: true,
          picFullWidth: width + '%'
        })
      }
    }
    img.src = this.props.image
  }

  /**
   * On mouse down event.
   * @param {Object} event data
   */
  onMouseDown = (e) => {
    var ripple = Ripple.createRipple(this.refs.pic, {
      backgroundColor: '#fff',
      opacity: 0.3,
      zIndex: 8
    }, createRippleMouse(this.refs.pic, e, 1.5))
    Ripple.makeRipple(ripple)
  }

  /**
   * On touch event (on mobile).
   * @param {Object} event data
   */
  onTouchStart = (e) => {
    var ripple = Ripple.createRipple(this.refs.pic, {
      backgroundColor: '#fff',
      opacity: 0.3,
      zIndex: 8
    }, createRippleMouse(this.refs.pic, e, 1.5, true))
    Ripple.makeRipple(ripple)
  }

  render () {
    // Styles.
    const style = Object.assign(
      {
        opacity: this.state.opacity
      }, this.props.style
    )

    const picBackgroundStyle = {
      visible: (!this.state.isVertical) ? 'hidden' : 'visible'
    }

    const picFullStyle = {
      width: (!this.state.isVertical) ? '100%' : this.state.picFullWidth
    }

    return (
      <div className='picture ripple' ref='pic' style={style} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart} onClick={(e) => this.props.onClick(e, this.props.data)}>
        <div className='pictureBackground' ref='picBackground' style={picBackgroundStyle} />
        <div className='pictureFull' ref='picFull' style={picFullStyle} />
      </div>
    )
  }
}
