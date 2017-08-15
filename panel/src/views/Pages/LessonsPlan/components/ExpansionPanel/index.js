import Component from '../../../../../helpers/Component'

export default class ExpansionPanel extends Component {
  beforeRender () {
    this.toggled = false

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
   * Collapses or rises up container with subjects.
   * @param {Boolean}
   */
  toggle (flag) {
    const root = this.getRoot()
    const icon = this.elements.toggleIcon

    root.style.height = root.scrollHeight + 'px'

    setTimeout(function () {
      root.style.height = (flag) ? 'auto' : '48px'
    }, (flag) ? 300 : 20)

    icon.style.transform = 'rotate(' + ((flag) ? 180 : 0) + 'deg)'

    this.toggled = flag
  }

  /**
   * On toggle icon click.
   * @param {Event}
   */
  onToggleIconClick = (e) => {
    this.toggle(!this.toggled)
  }

  /**
   * On expand / collapse icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onToggleIconMouseDown = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.toggleIcon, this.props.toggleIconRippleStyle, createRippleCenter(this.elements.toggleIcon, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On expand / collapse icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onToggleIconTouchStart = (e) => {
    const ripple = Ripple.createRipple(this.elements.toggleIcon, this.props.toggleIconRippleStyle, createRippleCenter(this.elements.toggleIcon, 14, 0.4, true))
    Ripple.makeRipple(ripple)

    this.touched = true
  }

  /**
   * Sets title.
   * @param {String}
   */
  setTitle (title) {
    this.elements.title.innerHTML = title
  }

  render () {
    return (
      <div className='expansion-panel' ref='root'>
        <div className='title-container'>
          <div className='title' ref='title' />
          <div className='icon-container'>
            <div className='toggle-icon' ref='toggleIcon' onClick={this.onToggleIconClick} onMouseDown={this.onToggleIconMouseDown} onTouchStart={this.onToggleIconTouchStart} />
          </div>
        </div>
        <div className='content' ref='content'>
          {
            this.props.children
          }
        </div>
      </div>
    )
  }

  afterRender () {
    const props = this.props

    if (props.toggleIconRippleStyle == null) {
      props.toggleIconRippleStyle = {
        backgroundColor: '#000',
        opacity: 0.3
      }
    }

    if (props.className != null) this.getRoot().classList.add(props.className)
  }
}
