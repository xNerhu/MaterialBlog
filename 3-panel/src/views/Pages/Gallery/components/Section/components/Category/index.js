import Component from '../../../../../../../helpers/Component'

export default class Category extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  loadImage () {
    const root = this.getRoot()

    const img = new Image()

    const onLoad = this.props.onLoad

    img.onload = function () {
      root.style.backgroundImage = 'url(' + img.src + ')'

      if (typeof onLoad === 'function') onLoad()
    }

    img.src = this.props.data.pictures[0]
  }

  render () {
    return (
      <div className='page-gallery-category' ref='root'>
        <div className='title'>
          {
            this.props.data.name
          }
          <div className='menu-icon' />
        </div>
      </div>
    )
  }

  afterRender () {
    this.loadImage()
  }
}
