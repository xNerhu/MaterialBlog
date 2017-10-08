import Component from 'inferno-component'

export default class Picture extends Component {
  constructor () {
    super()
    this.elements = {}

    this.selected = false
  }

  onClick = (e) => {
    const root = this.elements.root
    const picturesDialog = this.props.picturesDialog
    const onClick = this.props.onClick

    if (picturesDialog.toggledDeletingMode) {
      this.select(!this.selected)
    }

    if (typeof onClick === 'function') onClick(e, this)
  }

  select (flag) {
    const img = this.elements.img
    const selectContainer = this.elements.selectContainer

    selectContainer.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      selectContainer.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 200)

    if (this.props.picturesDialog.state.pictures.length === 1) {
      selectContainer.style.width = img.clientWidth + 'px'
      selectContainer.style.height = img.clientHeight + 'px'
    }

    this.selected = flag
  }

  onLoad = (e) => {
    this.elements.root.style.opacity = '1'
  }

  render () {
    return (
      <div className='picture' ref={(e) => this.elements.root = e} onClick={this.onClick}>
        <img ref={(e) => this.elements.img = e} src={this.props.url} onLoad={this.onLoad} />
        <div className='select-container' ref={(e) => this.elements.selectContainer = e}>
          <div className='icon' />
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.picturesDialog.pictures.push(this)
  }
}
