import Component from 'inferno-component'

export default class Cell extends Component {
  constructor () {
    super()
    this.elements = {}
  }

  render () {
    const className = `cell ${this.props.className != null ? this.props.className : ''}`

    return (
      <div className={className}>
        <div className='title'>
          {
            this.props.title
          }
        </div>
        {!this.props.content &&
          <div className='text'>
            {
              this.props.children
            }
          </div>
        }
        {this.props.content &&
          <div className='text' dangerouslySetInnerHTML={{__html: this.props.children}} />
        }
      </div>
    )
  }

  componentDidMount () {
    const props = this.props

    props.item.cells.push(this)
  }
}
