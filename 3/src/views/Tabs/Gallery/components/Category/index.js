import React from 'react'

export default class Category extends React.Component {
  /**
   * on mouse down event
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
  render () {
    const categoryStyle = {
      backgroundImage: 'url(' + this.props.data.pictures[0].url + ')'
    }
    return (
      <div className='category ripple' ref='category' style={categoryStyle} onMouseDown={this.onMouseDown}>
        <div className='category-title' ref='title'>
          {this.props.children}
          <div className='count'>{this.props.data.pictures.length}</div>
        </div>
      </div>
    )
  }
}
