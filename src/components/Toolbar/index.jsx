import Component from 'inferno-component'

import TabLayout from '../Blog/TabLayout'
import MultiIcon from './components/MultiIcon'

export default class Toolbar extends Component {
  constructor () {
    super()
    this.elements = {}

    this.touched = false
    this.items = []
    this.hiddenItems = []
  }

  /**
   * On item mouse down event.
   * Makes ripple.
   * @param {Event}
   * @param {DOMElement} element
   */
  onMultiIconMouseDown = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.multiIconContainer, this.props.actionIconRippleStyle, createRippleCenter(this.elements.multiIconContainer, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On item touch start event. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onMultiIconTouchStart = (e) => {
    const ripple = Ripple.createRipple(this.elements.multiIconContainer, this.props.actionIconRippleStyle, createRippleCenter(this.elements.multiIconContainer, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  hideItems (items, animation = true) {
    for (var i = 0; i < items.length; i++) {
      const itemRoot = items[i].getRoot()

      if (animation) {
        itemRoot.style.opacity = '0'
        itemRoot.style.top = '64px'
      }

      setTimeout(() => {
        itemRoot.style.display = 'none'
      }, animation ? 200 : 20)
    }
  }

  showItems (items) {
    for (var i = 0; i < items.length; i++) {
      const itemRoot = items[i].getRoot()

      itemRoot.style.display = 'block'

      setTimeout(() => {
        itemRoot.style.opacity = '1'
        itemRoot.style.top = '0px'
      }, 20)
    }
  }

  toggleButton (flag, button) {
    const buttonRoot = button.getRoot()

    buttonRoot.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(() => {
      buttonRoot.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 150)
  }

  setTitle (str) {
    this.elements.title.innerHTML = str
  }

  toggleItemsAndButton (flag, items, button) {
    // Toggle items
    setTimeout(() => {
      if (flag) this.hideItems(items, true)
      else this.showItems(items)
    }, (flag) ? 1 : 200)

    // Toggle button
    setTimeout(() => {
      this.toggleButton(flag, button)
    }, (flag) ? 200 : 1)
  }

  render () {
    const className = `toolbar toolbar-shadow ${(this.props.transparent) ? 'transparent' : ''}`

    return (
      <div className={className} style={this.props.style}>
        <div className='toolbar-content' ref={(e) => this.elements.content = e}>
          <div className='toolbar-multi-icon ripple-icon' ref={(e) => this.elements.multiIconContainer = e} onMouseDown={this.onMultiIconMouseDown} onTouchStart={this.onMultiIconTouchStart} onClick={this.props.onMultiIconClick}>
            <MultiIcon ref={(e) => this.elements.multiIcon = e} />
          </div>
          <div className='toolbar-title' ref={(e) => this.elements.title = e}>
            {this.props.title}
          </div>
          <div className='icons'>
            {this.props.children}
          </div>
        </div>
        {this.props.tabLayout &&
          <TabLayout ref={(e) => this.elements.tabLayout = e} tabs={this.props.tabs} />
        }
      </div>
    )
  }
}

Toolbar.defaultProps = {
  actionIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
