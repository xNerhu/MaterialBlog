import Component from '../../../../helpers/Component'

export default class Tooltip extends Component {
  beforeRender () {
    this.timer = null
    this.toggled = false
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
      if (this.timer !== null) {
        clearTimeout(this.timer)
      }

      const bounds = element.getBoundingClientRect()
      const left = bounds.left - element.offsetWidth * 0.6
      const top = bounds.top + element.offsetHeight + 10

      root.style.top = top + 'px'
      root.style.left = left + 'px'
      root.style.display = 'block'

      this.toggled = true

      setTimeout(function () {
        root.classList.add('toggled')
      }, 10)
    } else if (!flag && this.toggled) {
      root.classList.remove('toggled')

      this.toggled = false

      this.timer = setTimeout(function () {
        root.style.display = 'none'
      }, 300)
    }
  }

  render () {
    return (
      <div className='material-tooltip' ref='root' />
    )
  }

  afterRender () {
    this.setText(this.props.text)
  }
}
