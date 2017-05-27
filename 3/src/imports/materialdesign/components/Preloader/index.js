import React from 'react'

export default class Preloader extends React.Component {
  render () {
    return (
      <div style={this.props.style} className={this.props.className} ref='root'>
        <svg className='preloader-determinate' viewBox='25 25 50 50'>
          <circle className='path' ref='path' style={{stroke: this.props.strokeColor, strokeWidth: this.props.strokeWidth}} cx='50' cy='50' r='20' fill='none' strokeMiterlimit='10' />
        </svg>
      </div>
    )
  }
}

Preloader.defaultProps = {
  strokeColor: '#03a9f4',
  strokeWidth: 5
}
