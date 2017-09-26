import Component from 'inferno-component'

import Item from './components/Item'

export default class List extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      checkBoxes: false
    }

    this.items = []
    this.toggledPictures = false
  }

  render () {
    const className = `posts-list ${(this.state.checkBoxes) ? 'check-boxes' : ''}`

    return (
      <div className={className}>
        {
          this.props.posts.map((data, index) => {
            return <Item key={index} data={data} list={this} />
          })
        }
      </div>
    )
  }
}
