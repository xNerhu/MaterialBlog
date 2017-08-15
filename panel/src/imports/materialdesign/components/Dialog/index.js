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
  getRoot () {
    return this.elements.root
  }

  /**
   * On action button click.
   * @param {Object} event data
   * @param {Object} button data
   */
  onActionButtonClick = (e, data) => {
    if (typeof data.onClick === 'function') data.onClick(e)
  }

  /**
   * Shows or hides dialog.
   * @param {Boolean} show or hide
   */
  toggle (flag) {
    const root = this.getRoot()

    this.toggled = flag
    this.toggleDark(flag)

    root.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      root.style.top = (flag) ? '50%' : '25%'
    }, 20)

    setTimeout(function () {
      root.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 300)
  }

  /**
   * Shows or hides dark.
   * @param {Boolean} show or hide
   */
  toggleDark (flag) {
    const opacity = this.props.darkOpacity
    const dark = this.elements.dark

    dark.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      dark.style[(flag) ? 'opacity' : 'display'] = (flag) ? opacity : 'none'
    }, (flag) ? 20 : 300)
  }

  /**
   * Sets action buttons.
   * @param {Object}
   */
  setItems (items) {
    const action = this.elements.action

    action.innerHTML = ''

    for (var i = 0; i < items.length; i++) {
      const {
        text,
        style,
        onClick
      } = items[i]

      const element = (
        <MaterialButton shadow={false} text={text} onClick={onClick} style={style} rippleStyle={this.props.actionButtonRippleStyle} />
      )

      this.renderComponents(element, action)
    }
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

    if (props.title === 'false') {
      this.elements.title.style.display = 'none'
      this.elements.content.style.marginTop = '28px'
    }

    if (props.list === 'true') action.classList.add('list')
    else action.classList.add('side-by-side')
  }
}
