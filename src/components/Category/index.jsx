import Component from 'inferno-component'

import DataFormater from '../../../utils/date'
import MenuManager from '../../utils/MenuManager'

export default class Category extends Component {
  constructor () {
    super()
    this.elements = {}
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  onClick = (e) => {
    const onClick = this.props.onClick

    if (!this.canClick(e.target)) {
      if (typeof onClick === 'function') onClick(e, this)
    }
  }

  /**
   * On mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMouseDown = (e) => {
    const root = this.getRoot()

    if (!this.isTargetTitleParent(e.target) && !this.touched) {
      const ripple = Ripple.createRipple(root, this.props.rippleStyle, createRippleMouse(root, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onTouchStart = (e) => {
    const root = this.getRoot()

    if (!this.isTargetTitleParent(e.target)) {
      const ripple = Ripple.createRipple(root, this.props.rippleStyle, createRippleMouse(root, e, 1.5, true))
      Ripple.makeRipple(ripple)
    }

    this.touched = true
  }

  /**
   * On menu icon click.
   * Shows category menu.
   * @param {Event}
   */
  onMenuIconClick = (e) => {
    if (this.props.menuIcon) {
      const menu = window.app.panelElements.categoryMenu

      MenuManager.toggle(true, menu, e.target, true)
      window.panel.elements.galleryPage.selectedCategory = this
    }
  }

  /**
   * On menu icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconMouseDown = (e) => {
    if (!this.touched && this.props.menuIcon) {
      const ripple = Ripple.createRipple(e.target, this.props.menuIconRippleStyle, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On menu icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconTouchStart = (e) => {
    if (this.props.menuIcon) {
      const ripple = Ripple.createRipple(e.target, this.props.menuIconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
      Ripple.makeRipple(ripple)

      this.touched = true
    }
  }

  onInfoIconMouseEnter = (e) => {
    window.app.showTooltip(e.target, DataFormater.format(this.props.data.date))
  }

  canClick (target) {
    return (target.classList.contains('icon') && this.isTargetTitleParent(target))
  }

  isTargetTitleParent (target) {
    return (target === this.elements.title || target.parentNode === this.elements.title)
  }

  render () {
    const style = {
      backgroundImage: 'url(' + this.props.data.pictures[this.props.data.pictures.length - 1] + ')'
    }

    return (
      <div className='gallery-category ripple' ref={(e) => this.elements.root = e} style={style} onClick={this.onClick} onMouseDown={this.onMouseDown}>
        <div className='title' ref={(e) => this.elements.title = e}>
          {this.props.data.title}
          {!this.props.menuIcon &&
            <div className='info-icon icon' onMouseEnter={this.onInfoIconMouseEnter} />
          }
          {this.props.menuIcon &&
            <div
              className='menu-icon icon ripple-icon'
              onClick={this.onMenuIconClick}
              onMouseDown={this.onMenuIconMouseDown}
              ref={(e) => this.elements.menuIcon = e}
            />
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.getRoot().addEventListener('touchstart', this.onTouchStart)

    if (this.props.menuIcon) {
      this.elements.menuIcon.addEventListener('touchstart', this.onMenuIconTouchStart)
    }
  }
}

Category.defaultProps = {
  menuIcon: false,
  rippleStyle: {
    backgroundColor: '#fff',
    opacity: 0.2
  },
  menuIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
