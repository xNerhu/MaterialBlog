import Component from './../../../../helpers/Component'

export default class PreloaderDeterminate extends Component {
  beforeRender () {

  }
  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Sets value.
   * @param {Int} progress in progress (0 - 100)
   */
  setProgress = (percent) => {
    const root = this.getRoot()
    const circle = this.elements.circle

    const value = 122 * percent / 100 + ', 200'

    circle.setAttribute('stroke-dasharray', value)
    root.innerHTML = this.elements.svg.outerHTML
  }

  render () {
    return (
      <div className='material-preloader' ref='root' />
    )
  }

  afterRender () {
    const props = this.props
    const root = this.getRoot()

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
      'stroke-miterlimit': '10',
      'stroke-dasharray': '1, 200'
    })

    this.elements.svg.appendChild(this.elements.circle)

    root.innerHTML = this.elements.svg.outerHTML

    if (props.className != null) root.classList.add(props.className)
  }
}
