import Component from 'inferno-component'

import MenuItem from './components/MenuItem'

export default class Menu extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      items: []
    }

    this.items = []
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Sets items.
   */
  setItems (items) {
    this.items = []

    this.setState({
      items: items
    })
  }

  render () {
    return (
      <div className='material-menu' ref={(e) => this.elements.root = e}>
        {
          this.state.items.map((item, index) => {
            return (
              <MenuItem key={index} onClick={item.onClick} getMenu={() => { return this }}>
                {
                  item.text
                }
              </MenuItem>
            )
          })
        }
      </div>
    )
  }

  componentDidMount () {
    const props = this.props
    const root = this.getRoot()

    if (props.className != null) root.classList.add(props.className)
    if (props.mobile === true) root.classList.add('mobile')
    if (props.medium === true) root.classList.add('medium')
  }
}
