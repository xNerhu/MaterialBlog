import React from 'react'

export default class Tooltip extends React.Component {
  constructor () {
    super()

    this.state = {
      toggled: false
    }
  }

  /**
    * Shows tooltip.
    * @param {DOMElement} element
    */
  show = (el) => {
    const bounds = el.getBoundingClientRect()
    var left = bounds.left - el.offsetWidth * 0.6
    var top = bounds.top + el.offsetHeight + 10
    if (left + 100 > window.innerWidth) {
      left -= 100
    }
    if (top + 50 > window.innerHeight) {
      top -= 50
    }
    this.refs.tooltip.style.top = top + 'px'
    this.refs.tooltip.style.left = left + 'px'
    this.setState({
      toogled: true
    })
  }

  /**
    * Hides tooltip.
    */
  hide = () => {
    this.setState({
      toogled: false
    })
  }

  /**
    * Returns that tooltip is visible
    * @return {Boolean}
    */
  isToogled = () => {
    return this.state.toggled
  }

  render () {
    const toolTipStyle = {
      opacity: (!this.state.toogled) ? 0 : 0.75,
      visibility: (!this.state.toogled) ? 'hidden' : 'visible'
    }

    return (
      <div className='tooltip' ref='tooltip' style={toolTipStyle}>
        {this.props.children.split('\n').map((item, key) => {
          return <span key={key}>{item}<br /></span>
        })}
      </div>
    )
  }
}
