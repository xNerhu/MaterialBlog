import Component from 'inferno-component'

export default class AboutClassTab extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      left: 100
    }
  }

  load () {
    const blog = window.blog

    blog.togglePreloader(false)
    blog.getTabLayout().isLoading = false
  }

  render () {
    const style = {
      left: this.state.left + '%'
    }

    return (
      <div className='tab-page about-class' ref={(e) => this.elements.root = e} style={style}>
        TODO
      </div>
    )
  }

  componentDidMount () {
    window.blog.tabs.push(this)
  }
}
