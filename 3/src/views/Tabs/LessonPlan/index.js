import React from 'react'
import {Motion} from 'react-motion'

export default class LessonPlanTab extends React.Component {
  constructor () {
    super()

    this.state = {
      left: 0,
      display: 'none',
      defaultLeft: 0
    }

    this.isVisible = false

    this.root = null
  }

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
      <Motion onRest={onRest} style={{left: this.state.left}}>
        {value =>
          <div className='lesson-plan-tab tab-page' ref={(t) => { this.root = t }} style={{left: value.left, display: this.state.display}}>
            Plan lekcji
          </div>}
      </Motion>
    )
  }
}
