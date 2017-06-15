import Component from './../../../../helpers/Component'

import MaterialButton from '../MaterialButton'

export default class Snackbar extends Component {
  beforeRender () {
    this.toggled = false
  }

  /**
    * Gets root.
    * @return {DOMElement} root.
    */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Shows or hides snackbar.
   * @param {Boolean} show or hide.
   */
  toggle = (flag) => {
    const self = this
    const root = this.elements.root
    const content = this.elements.content

    if (flag) {
      root.style.display = 'block'

      setTimeout(function () {
        root.style.bottom = '0px'

        setTimeout(function () {
          content.style.opacity = '1'

          setTimeout(function () {
            self.toggle(false)
          }, self.props.timeout)
        }, 150)
      }, 20)
    } else {
      root.style.bottom = -root.scrollHeight + 'px'

      setTimeout(function () {
        root.style.display = 'none'
        content.style.opacity = '0'
      }, 300)
    }

    this.toggled = flag
  }

  /**
   * Sets action button.
   * @param {Object} action button data.
   */
  setActionButton = (button) => {
    const content = this.elements.content

    if (button.rippleStyle == null) {
      button.rippleStyle = {
        backgroundColor: '#FFEB3B',
        opacity: 0.2
      }
    }

    const element = (
      <MaterialButton className='material-snackbar-action' onClick={button.onClick} shadow={false} text={button.text} rippleStyle={button.rippleStyle} />
    )

    this.renderComponents(element, content)
  }

  render () {
    return (
      <div className='material-snackbar' ref='root'>
        <div className='material-snackbar-content' ref='content'>
          <div className='material-snackbar-text' ref='text'>
            {
              this.props.text
            }
          </div>
        </div>
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const root = this.getRoot()

    if (props.className != null) root.classList.add(props.className)
    if (props.timeout == null) props.timeout = 2500
  }
}
