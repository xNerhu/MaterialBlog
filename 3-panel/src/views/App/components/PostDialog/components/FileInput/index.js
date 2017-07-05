import Component from '../../../../../../helpers/Component'
import Url from '../../../../../../helpers/Url'

import MaterialButton from '../../../../../../imports/materialdesign/components/MaterialButton'

export default class FileInput extends Component {
  beforeRender () {
    this.touched = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On upload button click event.
   * Triggers input click.
   * @param {Event}
   */
  onButtonClick = (e) => {
    const input = this.elements.upload

    input.click()
  }

  /**
   * On button mouse enter event.
   * Shows tooltip.
   * @param {Event}
   */
  onButtonMouseEnter = (e) => {
    const tooltip = window.app.elements.tooltipUploadButton

    tooltip.toggle(true, this.elements.button.getRoot())
  }

  /**
   * On button mouse leave event.
   * Hides tooltip.
   * @param {Event}
   */
  onButtonMouseLeave = (e) => {
    const tooltip = window.app.elements.tooltipUploadButton

    tooltip.toggle(false)
  }

  /**
   * On upload input change event.
   * Shows or hides field with file name.
   * @param {Event}
   */
  onInputChange = (e) => {
    const self = this

    const preview = window.app.elements.postDialog.elements.preview
    const input = this.elements.upload
    const value = input.value

    const uploadValue = this.elements.value

    if (value !== '') {
      uploadValue.innerHTML = Url.extractFileName(value)

      let reader = new FileReader()

      reader.onload = function (e) {
        const src = e.target.result

        self.toggleUploadValue(true)

        preview.setMedia(src)
      }

      reader.readAsDataURL(input.files[0])
    }
  }

  /**
   * Shows or hides upload value.
   * @param {Boolean}
   * @param {Int} timer duration. Used in clearing form.
   */
  toggleUploadValue = (flag, timerDuration = 300) => {
    const actionIcon = this.elements.actionIcon
    const input = this.elements.upload

    const uploadValue = this.elements.value
    const indicator = this.elements.indicator

    uploadValue.style.opacity = (flag) ? '1' : '0'
    indicator.style.width = (flag) ? '100%' : '0'

    if (flag) {
      if (actionIcon.style.display !== 'block') {
        actionIcon.style.display = 'block'

        setTimeout(function () {
          actionIcon.style.opacity = '0.7'
        }, 20)
      }
    } else {
      actionIcon.style.opacity = '0'

      setTimeout(function () {
        actionIcon.style.display = 'none'
      }, timerDuration)
    }
  }

  /**
   * On action icon click event.
   * @param {Event}
   */
  onActionIconClick = (e) => {
    const preview = window.app.elements.postDialog.elements.preview
    const input = this.elements.upload

    const uploadValue = this.elements.value

    preview.setMedia('')

    input.value = ''

    this.toggleUploadValue(false)

    setTimeout(function () {
      uploadValue.innerHTML = ''
    }, 300)
  }

  /**
   * On action icon mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onActionIconMouseDown = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.actionIcon, this.actionIconRippleStyle, createRippleCenter(this.elements.actionIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On action icon touch start event.
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    let ripple = Ripple.createRipple(this.elements.actionIcon, this.actionIconRippleStyle, createRippleCenter(this.elements.actionIcon, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  render () {
    return (
      <div className='post-dialog-upload-container'>
        <MaterialButton ref='button' onClick={this.onButtonClick} className='button' text='Dodaj zdjęcie' />
        <div className='value-container'>
          <div className='value' ref='value' />
          <div className='indicator' ref='indicator' />
          <div className='icon ripple-icon' ref='actionIcon' onClick={this.onActionIconClick} onMouseDown={this.onActionIconMouseDown} onTouchStart={this.onTouchStart} />
        </div>
        <input className='upload-input' ref='upload' type='file' name='pic' accept='image/*' onChange={this.onInputChange} />
      </div>
    )
  }

  afterRender () {
    const buttonRoot = this.elements.button.getRoot()
    const props = this.props

    if (props.actionIconRippleStyle == null) {
      props.actionIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.2
      }
    }

    buttonRoot.addEventListener('mouseenter', this.onButtonMouseEnter)
    buttonRoot.addEventListener('mouseleave', this.onButtonMouseLeave)
  }
}
