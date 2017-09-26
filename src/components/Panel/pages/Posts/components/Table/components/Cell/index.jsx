import Component from 'inferno-component'

import MenuManager from '../../../../../../../../utils/MenuManager'

import CheckBox from '../../../../../../../../materialdesign/components/CheckBox'

export default class Cell extends Component {
  constructor () {
    super()
    this.elements = {}

    this.touched = false
  }

  /**
   * On menu icon click.
   * Shows menu.
   * @param {Event}
   */
  onMenuIconClick = (e) => {
    if (this.props.data.editable) {
      const menu = window.app.panelElements.postMenu

      MenuManager.toggle(true, menu, e.target, true)
      window.panel.elements.postsPage.selectedPost = this
    }
  }

  /**
   * On menu icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconMouseDown = (e) => {
    if (!this.touched && this.props.data.editable) {
      const ripple = Ripple.createRipple(e.target, this.props.menuIconRippleStyle, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On menu icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onMenuIconTouchStart = (e) => {
    if (this.props.data.editable) {
      const ripple = Ripple.createRipple(e.target, this.props.menuIconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
      Ripple.makeRipple(ripple)

      this.touched = true
    }
  }

  onCheck (flag, checkbox) {
    window.panel.elements.postsPage.onCheckBox(flag, checkbox)
  }

  render () {
    const style = {
      display: (!this.props.data.deleted) ? 'table-row' : 'none'
    }

    const className = (!this.props.data.editable) ? 'not-editable' : ''

    return (
      <tr className={className} style={style}>
        <td className='check-box-cell'>
          <CheckBox ref={(e) => this.elements.checkbox = e} onCheck={this.onCheck} disabled={!this.props.data.editable} />
        </td>
        <td className='id-cell'>
          {this.props.data._id}
        </td>
        <td>
          {this.props.data.authorInfo.username}
        </td>
        <td>
          {this.props.data.date}
        </td>
        <td>
          {this.props.data.comments.length}
        </td>
        <td>
          {this.props.data.likes.length}
        </td>
        <td className='picture-cell'>
          <img src={this.props.data.media} />
        </td>
        <td>
          {this.props.data.title}
        </td>
        <td dangerouslySetInnerHTML={{__html: this.props.data.content}} />
        <td className='menu-icon-cell'>
          <div className='menu-icon ripple-icon' onClick={this.onMenuIconClick} onMouseDown={this.onMenuIconMouseDown} onTouchStart={this.onMenuIconTouchStart} />
        </td>
      </tr>
    )
  }

  componentDidMount () {
    this.props.table.items.push(this)
  }
}

Cell.defaultProps = {
  menuIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
