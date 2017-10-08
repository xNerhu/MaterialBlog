import Component from 'inferno-component'

import Preloader from '../../../../../../../../materialdesign/components/Preloader'

export default class Item extends Component {
  constructor () {
    super()

    this.touched = false
  }

  onCancelIconClick = (e) => {
    const dialog = this.props.dialog
    const index = dialog.state.items.indexOf(this.props.data)

    if (!dialog.state.items[index].uploading) {
      const items = dialog.state.items
      items[index].canceled = true

      dialog.setState({
        items
      })
    }
  }

  /**
   * On cancel uploading icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onCancelIconMouseDown = (e) => {
    if (!this.touched && !this.props.data.done) {
      const ripple = Ripple.createRipple(e.target, this.props.cancelIconRippleStyle, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On cancel uploading icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onCancelIconTouchStart = (e) => {
    if (!this.props.data.done) {
      const ripple = Ripple.createRipple(e.target, this.props.cancelIconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
      Ripple.makeRipple(ripple)
      this.touched = true
    }
  }

  render () {
    const style = {
      height: (!this.props.data.canceled) ? '56px' : '0px'
    }

    const cancelIconStyle = {
      opacity: (this.props.data.uploading) ? '0.2' : '0.7'
    }

    const doneStyle = {
      width: (!this.props.data.done) ? '0px' : '100%',
      height: (!this.props.data.done) ? '0px' : '100%'
    }

    const preloaderStyle = {
      display: (this.props.data.uploading) ? 'block' : 'none'
    }

    return (
      <div className='gallery-upload-pictures-dialog-item' style={style}>
        <div className='preloader-container'>
          <Preloader style={preloaderStyle} />
          <div className='done' style={doneStyle} />
        </div>
        <div className='file-name'>
          {this.props.data.fileName}
        </div>
        <div className='cancel-icon' style={cancelIconStyle} onClick={this.onCancelIconClick} onMouseDown={this.onCancelIconMouseDown} onTouchStart={this.onCancelIconTouchStart} />
      </div>
    )
  }
}

Item.defaultProps = {
  cancelIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
