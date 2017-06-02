import React from 'react'

export default class AboutClassTab extends React.Component {
  /**
   * Gets root
   * @param {DomElement}
   */
  getRoot = () => {
    return this.refs.root
  }

  render () {
    return (
      <div className='about-class-tab tab-page' ref='root'>

      </div>
    )
  }
}
