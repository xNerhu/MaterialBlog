import Component from '../../../../../helpers/Component'

export default class Picture extends Component {
  beforeRender () {
    this.naturalWidth = 0
    this.naturalHeight = 0
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On click event.
   * @param {Event}
   */
  onClick = (e) => {
    if (typeof this.props.onClick === 'function') this.props.onClick(e, this)
  }

  render () {
    return (
      <img className='picture' ref='root' draggable='false' onClick={this.onClick} />
    )
  }

  afterRender () {
    const self = this
    const root = this.getRoot()

    root.onload = function () {
      this.style.opacity = '1'
      self.naturalWidth = this.naturalWidth
      self.naturalHeight = this.naturalHeight
    }

    this.elements.root.src = this.props.url
  }
}
