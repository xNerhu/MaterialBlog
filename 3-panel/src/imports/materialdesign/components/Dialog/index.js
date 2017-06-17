import Component from './../../../../helpers/Component'

import MaterialButton from '../MaterialButton'

export default class Dialog extends Component {
  beforeRender () {
    this.toggled = false
  }

 /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On action button click event.
   * @param {Object} event data
   * @param {Object} button data
   */
  onActionButtonClick = (e, data) => {
    if (typeof data.onClick === 'function') {
      data.onClick(e)
    }
  }

  /**
   * Toggle dialog.
   * @param {Boolean} show or hide
   */
  toggle = (flag) => {
    const root = this.getRoot()

    if (flag && !this.toggled) {
      this.toggled = true

      root.style.display = 'block'
      setTimeout(function () {
        root.style.opacity = '1'
        root.style.top = '50%'
      }, 10)

      this.toggleDark(true)
    } else {
      this.toggled = false

      root.style.opacity = '0'
      root.style.top = '25%'
      setTimeout(function () {
        root.style.display = 'none'
      }, 300)

      this.toggleDark(false)
    }
  }

  /**
   * Toggle dark.
   * @param {Boolean} show or hide
   */
  toggleDark = (flag) => {
    const opacity = this.props.darkOpacity
    const dark = this.elements.dark

    if (flag) {
      dark.style.display = 'block'

      setTimeout(function () {
        dark.style.opacity = opacity
      }, 10)
    } else {
      dark.style.opacity = '0'

      setTimeout(function () {
        dark.style.display = 'none'
      }, 300)
    }
  }

  /**
   * Sets action buttons.
   * @param {Object}
   */
  setItems = (items) => {
    const action = this.elements.action

    action.innerHTML = ''

    for (var i = 0; i < items.length; i++) {
      const item = items[i]
      const text = item.text
      const style = item.style
      const onClick = item.onClick

      const element = (
        <MaterialButton shadow={false} text={text} onClick={onClick} style={style} rippleStyle={this.props.actionButtonRippleStyle} />
      )

      this.renderComponents(element, action)
    }

    const clear = (
      <div className='material-dialog-action-clear' />
    )

    this.renderComponents(clear, action)
  }

  render () {
    return (
      <div className={this.props.className}>
        <div className='material-dialog' ref='root'>
          <div className='material-dialog-title' ref='title'>
            {
              this.props.title
            }
          </div>
          <div className='material-dialog-content' ref='content'>
            {
              this.props.children
            }
          </div>
          <div className='material-dialog-action' ref='action' />
        </div>
        <div className='material-dialog-dark' ref='dark' />
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const root = this.getRoot()
    const action = this.elements.action

    if (props.darkOpacity == null) props.darkOpacity = 0.7

    if (props.toggledOffTop == null) props.toggledOffTop = '25%'
    else root.style.top = props.toggledOffTop

    if (props.actionButtonRippleStyle == null) {
      props.actionButtonRippleStyle = {
        backgroundColor: '#FFC107',
        opacity: 0.3
      }
    }

    if (props.title === false) {
      this.elements.title.style.display = 'none'
      this.elements.content.style.marginTop = '28px'
    }

    if (props.list === true) action.classList.add('list')
    else action.classList.add('side-by-side')
  }
}
