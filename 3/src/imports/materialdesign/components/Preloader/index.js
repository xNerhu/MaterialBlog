import Component from './../../../../helpers/Component'

export default class Preloader extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  render () {
    return (
      <div className='material-preloader' ref='root' />
    )
  }

  afterRender () {
    // Must add svg manually.
    this.elements.svg = document.createElement('svg')
    this.elements.svg.className = 'preloader-determinate'
    this.elements.svg.setAttribute('viewBox', '25 25 50 50')

    this.elements.circle = document.createElement('circle')
    this.elements.circle.className = 'path'
    this.elements.circle.setAttributes({
      cx: '50',
      cy: '50',
      r: '20',
      fill: 'none',
      'stroke-miterlimit': '10'
    })

    this.elements.svg.appendChild(this.elements.circle)

    this.elements.root.innerHTML = this.elements.svg.outerHTML

    if (this.props.className != null) this.getRoot().classList.add(this.props.className)
  }
}
