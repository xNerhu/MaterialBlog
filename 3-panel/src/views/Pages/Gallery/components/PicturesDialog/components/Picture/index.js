import Component from '../../../../../../../helpers/Component'

export default class Picture extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  render () {
    return (
      <div className='picture' ref='root'>
        <img ref='img' />
      </div>
    )
  }

  afterRender () {
    const pictures = this.props.getPictures()
    let isVertical = false

    if (pictures.elements.container.classList.contains('count-1')) {
      isVertical = null
    }

    const root = this.getRoot()
    const img = this.elements.img

    const _img = new Image()

    _img.onload = function () {
      img.src = _img.src
      root.style.opacity = '1'

      if (isVertical == null) {
        isVertical = (img.height >= img.width)
      }

      if (isVertical) {
        pictures.elements.container.classList.add('vertical')
      }
    }

    _img.onerror = function () {
      _img.onload()
    }

    _img.src = this.props.url
  }
}
