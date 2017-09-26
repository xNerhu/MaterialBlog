import Component from 'inferno-component'

export default class Item extends Component {
  /**
   * On click.
   * Triggers onClick event from props.
   * @param {Event}
   */
  onClick = (e) => {
    const onClick = this.props.onClick

    if (typeof onClick === 'function') onClick(e, this)
  }

  render () {
    return (
      <div className='material-drop-down-item' onClick={this.onClick}>
        {this.props.text}
      </div>
    )
  }

  componentDidMount () {
    const dropDown = this.props.dropDown

    dropDown.items.push(this)
    if (this.props.selected) dropDown.selectItem(this)
  }
}
