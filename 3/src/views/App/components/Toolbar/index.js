import React from 'react'

import MultiIcon from './components/MultiIcon'

export default class Toolbar extends React.Component {
  constructor () {
    super()

    this.state = {
      height: 128
    }
  }

  /**
   * On tab icon mouse down event.
   * @param {object} event data
   */
  iconMouseDown = (e) => {
    var ripple = Ripple.createRipple(e.target, {
      backgroundColor: '#000',
      opacity: 0.2
    }, createRippleCenter(e.target, 14))
    Ripple.makeRipple(ripple)
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

    const toolbarStyle = {
      backgroundColor: this.props.backgroundColor,
      height: this.state.height
    }

    var first = true
    var hasLeftIcon = false

    return (
      <div style={toolbarStyle} className={toolbarClass}>
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
                return <MultiIcon ref='menuIcon' key={key} className={className} style={data.style} onClick={(e) => data.onClick(e)} onMouseDown={this.iconMouseDown} onTouchStart={this.iconTouchStart} />
              } else {
                return <div key={key} className={className} style={style} onClick={data.onClick} onMouseDown={this.iconMouseDown} onTouchStart={this.iconTouchStart} />
              }
            }
            if (data.type === 'Title') { // Check if type of child is title.
              var left = 16
              if (hasLeftIcon) { // Check if there is icon before title.
                left = 80
              }

              return <div key={key} className='toolbar-title' style={Object.assign(data.style, {left: left})}>{data.title}</div>
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
  backgroundColor: '#2196F3',
  height: 64,
  shadow: true
}
