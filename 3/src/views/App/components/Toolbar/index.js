import React from 'react'

export default class Toolbar extends React.Component {
  render () {
    var toolbarClass = (this.props.shadow) ? 'toolbar toolbar-shadow' : 'toolbar'

    var toolbarStyle = {
      backgroundColor: this.props.backgroundColor,
      height: this.props.height
    }

    var first = true
    var hasLeftIcon = false

    return (
      <div style={toolbarStyle} className={toolbarClass}>
        <div className='toolbar-content'>
          {this.props.items.map((data, key) => {
            if (data.type === 'Icon') { // check if type of child is icon
              var className = 'toolbar-icon toolbar-' + data.position.toLowerCase()

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

              return <div key={key} className={className} style={style} onClick={data.onClick} />
            }
            if (data.type === 'Title') { // check if type of child is title
              var left = 16
              if (hasLeftIcon) { // check if there is icon before title
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
