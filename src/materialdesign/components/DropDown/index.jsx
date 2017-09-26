import Component from 'inferno-component'

import Item from './components/Item'

export default class DropDown extends Component {
  constructor () {
    super()
    this.elements = {}

    this.toggled = false
    this.selectedItem = null
    this.items = []

    this.state = {
      selected: ''
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Toggles list.
   * @param {Boolean}
   */
  toggle (flag) {
    const root = this.getRoot()
    const list = this.elements.list

    // Toggle shadow
    setTimeout(() => {
      if (flag) root.classList.add('no-shadow')
      else root.classList.remove('no-shadow')
    }, (flag) ? 50 : 100)
    // Toggle list
    setTimeout(() => {
      list.style.display = (flag) ? 'block' : 'none'
    }, (flag) ? 10 : 270)

    setTimeout(() => {
      list.style.opacity = (flag) ? '1' : '0'
      list.style.height = ((flag) ? list.scrollHeight : 0) + 'px'
    }, 20)
    // Toggle scroll bar
    setTimeout(() => {
      list.style['overflow-y'] = (flag) ? 'auto' : 'hidden'
    }, (flag) ? 270 : 1)

    this.toggled = flag

    if (flag) {
      window.addEventListener('mouseup', this.onWindowMouseUp)
    } else {
      window.removeEventListener('mouseup', this.onWindowMouseUp)
    }
  }

  /**
   * On window mouse up.
   * Hides list.
   * @param {Event}
   */
  onWindowMouseUp = (e) => {
    this.toggle(false)
  }

  /**
   * On button click.
   * Shows list.
   * @param {Event}
   */
  onClick = (e) => {
    this.toggle(true)
  }

  /**
   * Selects item.
   * @param {Int | Item}
   */
  selectItem (index) {
    const item = (typeof index === 'number') ? this.items[index] : index

    if (this.selectedItem !== item) {
      this.selectedItem = item
      this.setState({
        selected: item.props.text
      })
    }
  }

  /**
   * Gets index of selected item.
   * @return {Int} index
   */
  getSelectedItemIndex () {
    return this.items.indexOf(this.selectedItem)
  }

  /**
   * On item click event.
   * @param {Event}
   * @param {Item}
   */
  onItemClick = (e, item) => {
    this.selectItem(this.items.indexOf(item))
  }

  render () {
    return (
      <div>
        <div className='material-drop-down' ref={(e) => this.elements.root = e} onClick={this.onClick}>
          <div className='selected'>
            {this.state.selected}
          </div>
          <div className='icon' />
        </div>
        <div className='material-drop-down-list' ref={(e) => this.elements.list = e}>
          {
            this.props.items.map((item, index) => {
              return <Item key={index} text={item.text} data={item.data} selected={item.selected} dropDown={this} onClick={this.onItemClick} />
            })
          }
        </div>
      </div>
    )
  }
}
