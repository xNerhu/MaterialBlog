import Component from 'inferno-component'

export default class ExpansionPanel extends Component {
  constructor () {
    super()
    this.elements = {}

    this.toggled = false
    this.touched = false

    this.state = {
      height: '48px',
      toggleIconRotate: 0
    }
  }

  /**
   * Collapses or rises up container with subjects.
   * @param {Boolean}
   */
  toggle (flag) {
    this.setState({
      height: this.elements.root.scrollHeight,
      toggleIconRotate: (flag) ? 180 : 0
    })

    setTimeout(() => {
      this.setState({
        height: (flag) ? 'auto' : 48
      })
    }, (flag) ? 300 : 20)

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
      const ripple = Ripple.createRipple(e.target, this.props.toggleIconRippleStyle, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On expand / collapse icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onToggleIconTouchStart = (e) => {
    const ripple = Ripple.createRipple(e.target, this.props.toggleIconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
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
    const style = {
      height: this.state.height
    }

    const toggleIconStyle = {
      transform: 'rotate(' + this.state.toggleIconRotate + 'deg)'
    }

    const className = `expansion-panel ${(this.props.className != null) ? this.props.className : ''}`

    return (
      <div className={className} style={style} ref={(e) => this.elements.root = e}>
        <div className='title-container'>
          <div className='title'>
            {this.props.title}
          </div>
          <div className='icon-container'>
            <div className='toggle-icon' ref={(e) => this.elements.toggleIcon = e} onClick={this.onToggleIconClick} onMouseDown={this.onToggleIconMouseDown} style={toggleIconStyle} />
          </div>
        </div>
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.elements.toggleIcon.addEventListener('touchstart', this.onToggleIconTouchStart)
  }
}

ExpansionPanel.defaultProps = {
  toggleIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.3
  }
}
