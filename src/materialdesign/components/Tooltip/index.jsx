import Component from 'inferno-component'

export default class Tooltip extends Component {
  constructor () {
    super()
    this.elements = {}

    this.timer = null
    this.toggled = false
    this.target = null
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Sets text.
   * @param {String} text.
   */
  setText (str) {
    this.getRoot().innerHTML = str
  }

  /**
   * Shows or hides tooltip.
   * @param {Boolean} show or hide.
   * @param {DOMElement} element.
   */
  toggle (flag, element) {
    const root = this.getRoot()

    if (flag && !this.toggled) {
      // Fix vanishing
      if (this.timer != null) {
        clearTimeout(this.timer)
      }

      const bounds = element.getBoundingClientRect()
      let left = bounds.left - element.offsetWidth * 0.5
      let top = bounds.top + element.offsetHeight + 10

      root.style.top = top + 'px'
      root.style.left = left + 'px'
      root.style.display = 'block'

      this.toggled = true

      setTimeout(() => {
        root.classList.add('toggled')

        // Fix left position
        if (root.clientWidth + left >= window.innerWidth) {
          left -= root.clientWidth
          root.style.left = left + 'px'
        }

        // Fix top position
        if (root.clientHeight + top >= window.innerHeight) {
          top -= root.clientHeight * 2.5
          root.style.top = top + 'px'
        }
      }, 10)
    } else if (!flag && this.toggled) {
      root.classList.remove('toggled')

      this.toggled = false

      this.timer = setTimeout(() => {
        root.style.display = 'none'
      }, 300)

      this.clearTargetEvents()
    }
  }

  show (target) {
    this.toggle(true, target)
    this.target = target

    target.addEventListener('mouseleave', this.onTargetMouseLeave)
    target.addEventListener('click', this.onTargetClick)
  }

  clearTargetEvents () {
    this.target.removeEventListener('mouseleave', this.onTargetMouseLeave)
    this.target.removeEventListener('click', this.onTargetClick)
  }

  onTargetClick = (e) => {
    this.toggle(false)
    this.clearTargetEvents()
  }

  onTargetMouseLeave = (e) => {
    this.toggle(false)
    this.clearTargetEvents()
  }

  render () {
    return (
      <div className='material-tooltip' ref={(e) => this.elements.root = e}>
        {this.props.text}
      </div>
    )
  }
}
