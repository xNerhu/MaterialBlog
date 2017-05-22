import React from 'react'

export default class AboutClassTab extends React.Component {
  constructor () {
    super()

    this.state = {
      left: 0,
      display: 'none',
      defaultLeft: 0
    }

    this.root = null
  }

  /**
   * Gets root
   * @param {DomElement}
   */
  getRoot = () => {
    return this.root
  }

  render () {
    var self = this
    function onRest () {
      if (!self.isVisible) {
        self.setState({display: 'none'})
      }
    }

    return (
      <div className='about-class-tab tab-page' ref={(t) => { this.root = t }}>
        O Klasie
      </div>
    )
  }
}
