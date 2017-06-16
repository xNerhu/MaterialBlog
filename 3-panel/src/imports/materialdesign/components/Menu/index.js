import Component from '../../../../helpers/Component'

import MenuItem from './components/MenuItem'

export default class Menu extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Sets items.
   */
  setItems = (items) => {
    const root = this.getRoot()

    for (var i = 0; i < items.length; i++) {
      const item = items[i]

      const element = (
        <MenuItem onClick={item.onClick}>
          {
            item.text
          }
        </MenuItem>
      )

      this.renderComponents(element, root)
    }
  }

  render () {
    return (
      <div className='material-menu' ref='root' />
    )
  }

  afterRender () {
    const props = this.props
    const root = this.getRoot()

    if (props.className != null) root.classList.add(props.className)
    if (props.mobile === true) root.classList.add('mobile')
    if (props.medium === true) root.classList.add('medium')
  }
}
