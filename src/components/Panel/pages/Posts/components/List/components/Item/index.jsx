import Component from 'inferno-component'

import MenuManager from '../../../../../../../../utils/MenuManager'

import Cell from './components/Cell'

import CheckBox from '../../../../../../../../materialdesign/components/CheckBox'

export default class Item extends Component {
  constructor () {
    super()
    this.elements = {}

    this.cells = []
  }

  /**
   * On menu icon click.
   * Shows menu.
   * @param {Event}
   */
  onMenuIconClick = (e) => {
    if (this.props.data.editable) {
      const panel = window.panel
      const menu = window.app.panelElements.postMenu

      MenuManager.toggle(true, menu, e.target, true)
      panel.elements.postsPage.selectedPost = this
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
    const className = `posts-list-item ${(!this.props.data.editable) ? 'not-editable' : ''}`

    const style = {
      display: (!this.props.data.deleted) ? 'block' : 'none'
    }

    return (
      <div className={className} style={style}>
        <Cell title='AKCJA' item={this} className='action'>
          {
            <div>
              <CheckBox onCheck={this.onCheck} ref={(e) => this.elements.checkbox = e} />
              <div className='menu-icon ripple-icon' onClick={this.onMenuIconClick} onMouseDown={this.onMenuIconMouseDown} onTouchStart={this.onMenuIconTouchStart} disabled={!this.props.data.editable} />
            </div>
          }
        </Cell>
        <Cell title='ID' item={this}>
          {this.props.data._id}
        </Cell>
        <Cell title='AUTOR' item={this}>
          {this.props.data.authorInfo.username}
        </Cell>
        <Cell title='DATA' item={this}>
          {this.props.data.date}
        </Cell>
        <Cell title='KOMENTARZE' item={this}>
          {this.props.data.comments.length}
        </Cell>
        <Cell title='POLUBIENIA' item={this}>
          {this.props.data.likes.length}
        </Cell>
        <Cell title='ZDJĘCIE' item={this} className='picture'>
          <img src={this.props.data.media} />
        </Cell>
        <Cell title='TYTUŁ' item={this}>
          {this.props.data.title}
        </Cell>
        <Cell title='TREŚĆ' ref={(e) => this.elements.content = e} item={this} content={true}>
          {this.props.data.content}
        </Cell>
      </div>
    )
  }

  componentDidMount () {
    this.props.list.items.push(this)
  }
}

Item.defaultProps = {
  menuIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.2
  }
}
