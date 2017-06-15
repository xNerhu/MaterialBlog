import Component from './../../../../../../helpers/Component/index'

export default class Item extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Animates item.
   */
  animate = () => {
    const root = this.getRoot()

    const until = ((this.props.index + 1) * 0.075) * 500
    setTimeout(function () {
      root.style.opacity = '1'
    }, until)
  }

  render () {
    return (
      <div className='search-results-item' ref='root'>
        <img className='search-results-item-media' ref='media' dragable='false' />
        <div className='search-results-item-content'>
          <a className='search-results-item-title' ref='link' />
          <div className='search-results-item-text' ref='content' />
          <div className='search-results-item-info'>
            <span className='search-results-item-info-author'>{this.props.data.author}</span>, {this.props.data.date}
          </div>
        </div>
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const data = props.data
    const link = this.elements.link
    const content = this.elements.content
    const media = this.elements.media

    if (data.media != null) {
      media.src = data.media
      media.style.display = 'block'

      media.onload = function () {
        setTimeout(function () {
          media.style.opacity = '1'
        }, 10)
      }
    }

    link.href = '/?post=' + data.id
    link.innerHTML = data.title

    content.innerHTML = data.text

    this.animate()
  }
}
