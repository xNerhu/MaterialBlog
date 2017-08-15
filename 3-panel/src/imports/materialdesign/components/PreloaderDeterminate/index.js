import Component from './../../../../helpers/Component'

export default class PreloaderDeterminate extends Component {
  beforeRender () {
    if (window.preloaderDeterminateID == null) {
      window.preloaderDeterminateID = 0
    } else {
      window.preloaderDeterminateID++
    }

    this.id = window.preloaderDeterminateID
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Sets value.
   * @param {Int} progress in percent (0 - 100)
   */
  setProgress (percent) {
    // When I change this to this.elements.circle all changes on circle will not work. Very weird bug.
    const circle = document.querySelectorAll('#preloader-determinate-' + this.id + ' .path')[0]

    if (percent > 0 && circle.style.display !== 'block') {
      circle.style.display = 'block'
    } else if (percent <= 0 && circle.style.display !== 'none') {
      circle.style.display = 'none'
    }

    setTimeout(function () {
      circle.style['stroke-dasharray'] = 122 * percent / 100 + ', 200'
    }, 10)
  }

  render () {
    return (
      <div className='material-preloader' ref='root' />
    )
  }

  afterRender () {
    const props = this.props
    const root = this.getRoot()

    root.id = 'preloader-determinate-' + window.preloaderDeterminateID

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

    root.innerHTML = this.elements.svg.outerHTML

    if (props.className != null) root.classList.add(props.className)
  }
}
