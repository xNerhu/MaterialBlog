import React from 'react'
import {Motion} from 'react-motion'

import Category from './components/Category'
import Picture from './components/Picture'

export default class GalleryTab extends React.Component {
  constructor () {
    super()

    this.state = {
      left: 0,
      display: 'none',
      defaultLeft: 0,
      categories: [],
      pictures: []
    }

    this.isVisible = false

    this.root = null

    this.loadedCategories = 0
  }

  loadCategories = () => {
    var self = this

    this.props.getApp().setState({
      dataPreloaderVisible: true
    })
    this.props.getApp().selected.gallery = true
    setTimeout(function () {
      self.props.getApp().canSelectTab = false
      self.setState({
        categories: [
          {
            name: 'Vertical Image Test',
            date: '29.04.2017',
            pictures: [
              {
                url: 'http://upload.wikimedia.org/wikipedia/commons/d/dc/Xemeneia_can_folch_vila_ol%C3%ADmpica_vertical.JPG'
              }
            ]
          },
          {
            name: 'Test',
            date: '29.04.2017',
            pictures: [
              {
                url: 'http://s1.picswalls.com/thumbs2/2016/06/10/4k-background_065335972_309.jpg'
              },
              {
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWvnQ3zWCida1iD-z2jY0J2yQLE5PcdT84l2ObicCjk3daxVJ4YA'
              },
              {
                url: 'https://i.ytimg.com/vi/uSJSPRQdLd8/maxresdefault.jpg'
              }
            ]
          },
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
      })
    }, 50)
  }

  onCategoryLoad = () => {
    this.loadedCategories++
    if (this.loadedCategories >= this.state.categories.length) {
      this.props.getApp().setState({
        dataPreloaderVisible: false
      })
      this.props.getApp().canSelectTab = true

      var pics = []
      for (var c = 0; c < 1; c++) {
        for (var p = 0; p < this.state.categories[c].pictures.length; p++) {
          pics.push(this.state.categories[c].pictures[p])
        }
      }
      this.setState({
        pictures: pics
      })
    }
  }
  isVertical = (width, height) => {
    return (height === width)
  }
  render () {
    var self = this
    function onRest () {
      if (!self.isVisible) {
        self.setState({display: 'none'})
      }
    }

    var index = 0

    // Styles.

    var picturesClass = 'gallery-pictures'
    if (this.state.pictures.length > 4) picturesClass += ' gallery-pictures-many'

    return (
      <Motion onRest={onRest} style={{left: this.state.left}}>
        {value =>
          <div className='gallery-tab tab-page' ref={(t) => { this.root = t }} style={{left: value.left, display: this.state.display}}>
            <div className='gallery-categories'>
              {
                this.state.categories.map((data, i) => {
                  return <Category key={i} data={data} getApp={this.props.getApp} onLoad={this.onCategoryLoad}>{data.name}</Category>
                })
              }
            </div>
            <div className='gallery-pictures gallery-pictures-many' ref={(t) => { this.pictures = t }}>
              {
                this.state.pictures.map((data, i) => {
                  return <Picture key={i} image={data.url} isVertical={this.isVertical} />
                })
              }
            </div>
          </div>}
      </Motion>
    )
  }
}
