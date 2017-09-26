import Component from 'inferno-component'

export default class Preloader extends Component {
  constructor () {
    super()
    this.elements = {}
  }

  render () {
    const className = `material-preloader ${this.props.className || ''}`

    return (
      <div className={className} style={this.props.style}>
        <svg className='preloader-indeterminate' viewBox='25 25 50 50'>
          <circle className='path' cx='50' cy='50' r='20' fill='none' stroke-miterlimit='10' />
        </svg>
      </div>
    )
  }
}
