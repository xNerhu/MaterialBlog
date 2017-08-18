import Component from '../../../../../../helpers/Component'

export default class Item extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  onClick = (e) => {
    const onClick = this.props.onClick

    if (typeof onClick === 'function') onClick(e, this)
  }

  render () {
    return (
      <div className='material-drop-down-item' ref='root' onClick={this.onClick}>
        {
          this.props.text
        }
      </div>
    )
  }

  afterRender () {
    this.props.getDropDown().items.push(this)
  }
}
