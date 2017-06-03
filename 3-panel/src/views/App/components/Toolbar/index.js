import React from 'react'

import MultiIcon from './components/MultiIcon'

export default class Toolbar extends React.Component {
  /**
   * On tab icon mouse down event.
   * @param {object} event data
   */
  iconMouseDown = (e) => {
    if (!this.props.getApp().blockMouseDownEvent) {
      var ripple = Ripple.createRipple(e.target, {
        backgroundColor: '#000',
        opacity: 0.2
      }, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On tab icon touch start event.
   * @param {object} event data
   */
  iconTouchStart = (e) => {
    var ripple = Ripple.createRipple(e.target, {
      backgroundColor: '#000',
      opacity: 0.2
    }, createRippleCenter(e.target, 14, 0.4, true))
    Ripple.makeRipple(ripple)
  }

  render () {
    // Styles.
    const toolbarClass = (this.props.shadow) ? 'toolbar toolbar-shadow' : 'toolbar'

    var first = true
    var _first = true
    var hasLeftIcon = false

    return (
      <div ref='root' className={toolbarClass}>
        <div className='toolbar-content'>
          {this.props.items.map((data, key) => {
            if (data.type === 'Icon') { // Check if type of child is icon.
              var className = 'toolbar-icon ripple-icon toolbar-' + data.position.toLowerCase()

              if (first) {
                if (data.position === 'Right') {
                  className += ' toolbar-right-first'
                  first = false
                }
              }

              if (data.position === 'Left') {
                hasLeftIcon = true
              }

              var style = Object.assign(
                {
                  backgroundImage: 'url(' + data.image + ')'
                }, data.style
              )

              if (data.subType === 'Menu') {
                return <MultiIcon ref='menuIcon' key={key} className={className} style={data.style} onClick={data.onClick} onMouseDown={this.iconMouseDown} onTouchStart={this.iconTouchStart} id={data.id} />
              } else {
                return <div key={key} className={className} id={data.id} style={style} onClick={data.onClick} onMouseDown={this.iconMouseDown} onTouchStart={this.iconTouchStart} />
              }
            }
            if (data.type === 'Title') { // Check if type of child is title.
              var left = 16
              if (hasLeftIcon) { // Check if there is icon before title.
                left = 80
              }

              return <div key={key} className='toolbar-title' id={data.id} style={Object.assign(data.style, {left: left})}>{data.title}</div>
            }

            return null
          })}
        </div>
        {this.props.children}
      </div>
    )
  }
}

Toolbar.defaultProps = {
  shadow: true
}
