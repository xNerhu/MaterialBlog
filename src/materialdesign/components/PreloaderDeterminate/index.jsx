import Component from 'inferno-component'

export default class PreloaderDeterminate extends Component {
  constructor () {
    super()
    this.elements = {}
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot () {
    return this.elements.root
  }

  render () {
    const circleStyle = {
      display: (this.props.progress < 1) ? 'none' : 'block',
      'stroke-dasharray': 122 * this.props.progress / 100 + ', 200'
    }

    return (
      <div className='material-preloader' ref={(e) => this.elements.root = e}>
        <svg className='preloader-determinate' viewBox='25 25 50 50'>
          <circle style={circleStyle} className='path' cx='50' cy='50' r='20' fill='none' stroke-miterlimit='10' />
        </svg>
      </div>
    )
  }

  componentDidMount () {
    const props = this.props
    const root = this.getRoot()

    if (props.className != null) root.classList.add(props.className)
  }
}
