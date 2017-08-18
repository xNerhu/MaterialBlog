import Component from '../../../../helpers/Component'

import Item from './components/Item'

export default class DropDown extends Component {
  beforeRender () {
    this.toggled = false

    this.items = []
    this.selectedItem = null
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
   * @param {Array} items
   */
  setItems (items) {
    for (var i = 0; i < items.length; i++) {
      this.addItem(items[i])
    }
  }

  /**
   * Adds item.
   * @param {String} text
   */
  addItem (text) {
    const item = (
      <Item text={text} getDropDown={() => { return this }} onClick={this.onItemClick} />
    )

    this.renderComponents(item, this.elements.list)
  }

  /**
   * On item click event.
   * @param {Event}
   * @param {Item}
   */
  onItemClick = (e, item) => {
    this.selectedItem = item

    this.elements.selected.innerHTML = item.props.text
  }

  /**
   * Toggles list.
   * @param {Boolean}
   */
  toggle (flag) {
    const root = this.getRoot()
    const list = this.elements.list

    setTimeout(function () {
      if (flag) root.classList.add('no-shadow')
      else root.classList.remove('no-shadow')
    }, (flag) ? 50 : 100)

    setTimeout(function () {
      list.style.display = (flag) ? 'block' : 'none'
    }, (flag) ? 10 : 270)

    setTimeout(function () {
      list.style['overflow-y'] = (flag) ? 'auto' : 'hidden'
    }, (flag) ? 270 : 1)

    setTimeout(function () {
      list.style.opacity = (flag) ? '1' : '0'
      list.style.height = ((flag) ? list.scrollHeight : 0) + 'px'
    }, 20)

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
   * @param {Int} index
   */
  selectItem (index) {
    const item = this.items[index]

    this.selectItem = item
    this.elements.selected.innerHTML = item.props.text
  }

  /**
   * Gets index of selected item.
   * @return {Int} index
   */
  getSelectedItemIndex () {
    return this.items.indexOf(this.selectedItem)
  }

  render () {
    return (
      <div>
        <div className='material-drop-down' ref='root' onClick={this.onClick}>
          <div className='selected' ref='selected' />
          <div className='icon' ref='icon' />
        </div>
        <div className='material-drop-down-list' ref='list' />
      </div>
    )
  }
}
