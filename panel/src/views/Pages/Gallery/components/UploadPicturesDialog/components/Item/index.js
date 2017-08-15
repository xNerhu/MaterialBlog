import Component from '../../../../../../../helpers/Component'

import PreloaderDeterminate from '../../../../../../../imports/materialdesign/components/PreloaderDeterminate'

export default class Item extends Component {
  beforeRender () {
    this.canceled = false
    this.disabledCancelIcon = false

    this.touched = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * On done uploading.
   */
  onUpload () {
    const done = this.elements.done

    done.style.width = '28px'
    done.style.height = '28px'
  }

  /**
   * Disables cancel icon.
   */
  disableCancelIcon = () => {
    this.getRoot().classList.add('disabled-cancel-icon')

    this.disabledCancelIcon = true
  }

  /**
   * On cancel uploading icon click.
   * @param {Event}
   */
  onCancelIconClick = (e) => {
    if (!this.disabledCancelIcon) {
      this.canceled = true

      this.getRoot().style.height = '0px'
    }
  }

  /**
   * On cancel uploading icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onCancelIconMouseDown = (e) => {
    if (!this.touched && !this.getRoot().classList.contains('done')) {
      const ripple = Ripple.createRipple(this.elements.cancelIcon, this.props.cancelIconRippleStyle, createRippleCenter(this.elements.cancelIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On cancel uploading icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onCancelIconTouchStart = (e) => {
    if (!this.getRoot().classList.contains('done')) {
      const ripple = Ripple.createRipple(this.elements.cancelIcon, this.props.cancelIconRippleStyle, createRippleCenter(this.elements.cancelIcon, 14, 0.4, true))
      Ripple.makeRipple(ripple)
      this.touched = true
    }
  }

  render () {
    return (
      <div className='upload-pictures-dialog-item' ref='root' onClick={this.test}>
        <PreloaderDeterminate ref='preloader' />
        <div className='preloader-done'>
          <div className='circle' ref='done' />
        </div>
        <div className='text'>
          {
            this.props.fileName
          }
        </div>
        <div className='cancel-icon' ref='cancelIcon' onClick={this.onCancelIconClick} onMouseDown={this.onCancelIconMouseDown} onTouchStart={this.onCancelIconTouchStart} />
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const uploadPicturesDialog = props.getUploadPicturesDialog()

    if (props.cancelIconRippleStyle == null) {
      props.cancelIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.2
      }
    }

    uploadPicturesDialog.items.push(this)
  }
}
