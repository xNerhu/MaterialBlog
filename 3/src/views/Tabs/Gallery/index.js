import React from 'react'
import {Motion} from 'react-motion'

import Category from './components/Category'

export default class GalleryTab extends React.Component {
  constructor () {
    super()

    this.state = {
      left: 0,
      display: 'none',
      defaultLeft: 0,
      categories: [
        {
          name: 'Material Design',
          date: '25.04.2017',
          pictures: [
            {
              url: 'http://www.materialdoc.com/content/images/2015/11/materialdesign_introduction.png'
            },
            {
              url: 'https://drivenlocal.com/wp-content/uploads/2015/10/Material-design.jpg'
            }
          ]
        },
        {
          name: 'Material Design Dark',
          date: '20.04.2017',
          pictures: [
            {
              url: 'http://orig11.deviantart.net/20eb/f/2015/030/6/f/_minflat__dark_material_design_wallpaper__4k__by_dakoder-d8fjqzu.jpg'
            },
            {
              url: 'https://4kwallpapers.co/wp-content/uploads/2015/07/Red-Dark-Material-Design-Ultra-HD-Wallpaper.jpg'
            }
          ]
        },
        {
          name: 'Avatar',
          date: '17.04.2017',
          pictures: [
            {
              url: 'https://avatars2.githubusercontent.com/u/12050791?v=3&s=460'
            }
          ]
        }
      ]
    }

    this.isVisible = false

    this.root = null

    this.pictureWidth = 300
  }

  /**
   * Gets root.
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

    var index = 0

    return (
      <Motion onRest={onRest} style={{left: this.state.left}}>
        {value =>
          <div className='gallery-tab tab-page' ref={(t) => { this.root = t }} style={{left: value.left, display: this.state.display}}>
            <div className='categories'>
              {
                this.state.categories.map((data, i) => {
                  index++
                  return <Category key={i} index={index - 1} data={data} getApp={this.props.getApp}>{data.name}</Category>
                })
              }
            </div>
          </div>}
      </Motion>
    )
  }
}
