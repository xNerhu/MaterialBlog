import Component from 'inferno-component'

export default class Snackbar extends Component {
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
   * Shows or hides snackbar.
   * @param {Boolean} show or hide
   */
  toggle (flag) {
    const root = this.getRoot()
    const content = this.elements.content

    if (flag) {
      root.style.display = 'inline-block'
      root.style.position = 'relative'
      root.style.width = root.scrollWidth + 'px'
      root.style.position = 'fixed'

      root.style.opacity = '1'
      setTimeout(() => {
        root.style.bottom = '0px'

        setTimeout(() => {
          content.style.opacity = '1'

          setTimeout(() => {
            this.toggle(false)
          }, this.props.timeout)
        }, 150)
      }, 20)
    } else {
      root.style.bottom = -root.scrollHeight + 'px'

      setTimeout(() => {
        root.style.opacity = '0'
        root.style.display = 'none'
        content.style.opacity = '0'
      }, 300)
    }

    this.toggled = flag
  }

  show () {
    this.toggle(true)
  }

  render () {
    return (
      <div className='material-snackbar' ref={(e) => this.elements.root = e}>
        <div className='material-snackbar-content' ref={(e) => this.elements.content = e}>
          <div className='material-snackbar-text'>
            {this.props.text}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const props = this.props
    const root = this.getRoot()

    if (props.className != null) root.classList.add(props.className)
  }
}

Snackbar.defaultProps = {
  timeout: 2500
}
