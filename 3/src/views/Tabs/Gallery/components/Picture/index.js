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

      if (self.isVertical(this.width, this.height)) {
        const width = self.getImageWidth(this.height, this.width, self.refs.pic.clientHeight) * 100 / self.pictureWidth

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
   * Checks that image is vertical or horizontal.
   * @param {int} image width
   * @param {int} image height
   * @return {boolean} is vertical
   */
  isVertical = (width, height) => {
    return (width <= height) ? true : false
  }

  /**
   * Gets image width proportionally to height.
   * @param {int} default image height
   * @param {int} default image width
   * @param {int} image height
   * @return {int} image width
   */
  getImageWidth = (imgHeight, imgWidth, height) => {
    return height * imgWidth / imgHeight
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
      <div className='picture' ref='pic' style={style}>
        <div className='pictureBackground' ref='picBackground' style={picBackgroundStyle} />
        <div className='pictureFull' ref='picFull' style={picFullStyle} />
      </div>
    )
  }
}
