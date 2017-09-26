import Component from 'inferno-component'

import MaterialButton from '../MaterialButton'

export default class Dialog extends Component {
  constructor () {
    super()
    this.elements = {}

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

    Animation.animate(this.elements.root, flag, 300)

    setTimeout(() => {
      root.style.top = (flag) ? '50%' : '25%'
    }, 20)
  }

  /**
   * Shows or hides dark.
   * @param {Boolean} show or hide
   */
  toggleDark (flag) {
    const opacity = this.props.darkOpacity
    const dark = this.elements.dark

    Animation.animate(this.elements.dark, flag, 300, {
      options: [
        'display',
        'opacity'
      ],
      values: {
        'display': [
          'block',
          'none'
        ],
        'opacity': [
          this.props.darkOpacity,
          '0'
        ]
      }
    })
  }

  render () {
    return (
      <div className={this.props.className}>
        <div className='material-dialog' ref={(e) => this.elements.root = e}>
          <div className='material-dialog-title'>
            {
              this.props.title
            }
          </div>
          <div className='material-dialog-content'>
            {
              this.props.children
            }
          </div>
          <div className='material-dialog-action'>
            {
              this.props.items.map((item, index) => {
                return <MaterialButton key={index} shadow={false} text={item.text} onClick={item.onClick} style={item.style} rippleStyle={this.props.actionButtonRippleStyle} />
              })
            }
          </div>
        </div>
        <div className='material-dialog-dark' ref={(e) => this.elements.dark = e} onClick={() => {
          if (this.props.closeDialogOnDarkClick) {
            this.toggle(false)
          }
        }} />
      </div>
    )
  }

  componentDidMount () {
    const props = this.props
    const root = this.getRoot()

    if (!props.title) root.classList.add('no-title')

    if (props.list) root.classList.add('list')
    else root.classList.add('side-by-side')
  }
}

Dialog.defaultProps = {
  darkOpacity: 0.7,
  closeDialogOnDarkClick: true,
  title: true,
  list: false,
  actionButtonRippleStyle: {
    backgroundColor: '#FFC107',
    opacity: 0.3
  }
}
