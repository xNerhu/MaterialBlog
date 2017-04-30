import React from 'react'

export default class Category extends React.Component {
  /**
   * On mouse down event.
   * @param {Object} event data
   */
  onMouseDown = (e) => {
    if (e.target !== this.refs.title && e.target.parentNode !== this.refs.title) {
      var ripple = Ripple.createRipple(this.refs.category, {
        backgroundColor: '#fff',
        opacity: 0.3
      }, createRippleMouse(this.refs.category, e, 1.5))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On info mouse down event.
   * @param {Object} event data
   */
  onInfoMouseDown = (e) => {
    var ripple = Ripple.createRipple(this.refs.info, {
      backgroundColor: '#000',
      opacity: 0.2
    }, createRippleCenter(this.refs.info, 14))
    Ripple.makeRipple(ripple)
  }

  /**
   * On info mouse enter event.
   * @param {Object} event data
   */
  onInfoMouseEnter = (e) => {
    var tooltipsData = this.props.getApp().state.tooltipsData
    const tooltip = this.props.getApp().refs.tooltipCategoryInfo
    var info = {
      date: this.props.data.date,
      picturesCount: this.props.data.pictures.length
    }
    tooltipsData.category = info
    this.props.getApp().setState({tooltipsData: tooltipsData})
    if (!tooltip.state.toggled) tooltip.show(this.refs.info)
  }

  /**
   * On info mouse leave event.
   * @param {Object} event data
   */
  onInfoMouseLeave = (e) => {
    const tooltip = this.props.getApp().refs.tooltipCategoryInfo
    tooltip.hide()
  }

  /**
   * On click event
   * @param {Object} event data
   */
  onClick = (e) => {
    if (e.target !== this.refs.title && e.target !== this.refs.info) {
      this.props.onClick(e)
    }
  }

  render () {
    // Styles.
    const style = {
      backgroundImage: 'url(' + this.props.data.pictures[0].url + ')'
    }

    const infoStyle = {
      backgroundImage: 'url(src/images/NavigationDrawer/info.png)'
    }

    return (
      <div className='category ripple' ref='category' style={style} onMouseDown={this.onMouseDown} onClick={this.onClick}>
        <div className='category-title' ref='title'>
          {this.props.children}
          <div className='category-info ripple-icon' ref='info' style={infoStyle} onMouseDown={this.onInfoMouseDown} onMouseEnter={this.onInfoMouseEnter} onMouseLeave={this.onInfoMouseLeave} />
        </div>
      </div>
    )
  }
}
