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
      picturesVisible: false,
      picturesWidth: '100%',
      pictureWidth: 300,
      pictureHeight: 200,
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
      ],
      pictures: []
    }

    this.isVisible = false

    this.root = null

    this.pictureWidth = 300
    this.pictureHeight = 200
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize)
  }

  /**
   * on window resize event
   * @param {Object} event data
   */
  onResize = (e) => {
    if (this.state.picturesVisible) this.resizePicturesContainer()
  }

  /**
   * resizes pictures container to windows width
   */
  resizePicturesContainer = () => {
    if (window.innerWidth <= 2 * this.pictureWidth) {
      this.setState({
        picturesWidth: '100%',
        pictureWidth: '100%',
        pictureHeight: window.innerWidth * this.pictureHeight / this.pictureWidth
      })
    } else {
      var picIndex = 1
      while (true) {
        if (picIndex * this.pictureWidth <= window.innerWidth && picIndex <= this.state.pictures.length) {
          picIndex++
        } else {
          break
        }
      }
      var picturesWidth = this.pictureWidth * (picIndex - 1)
      this.setState({
        picturesWidth: picturesWidth,
        pictureWidth: this.pictureWidth,
        pictureHeight: this.pictureHeight
      })
    }
  }

  /**
   * Gets root.
   * @param {DomElement}
   */
  getRoot = () => {
    return this.root
  }

  /**
   * on category click
   * @param {Object} category data
   */
  onCategoryClick = (data) => {
    this.showPictures(data)
  }

  /**
   * shows all pictures from category
   * @param {Object} category data
   */
  showPictures = (data) => {
    var self = this

    this.setState({
      pictures: data.pictures,
      picturesVisible: true
    })

    // ReactBug, must wait 10 seconds
    setTimeout(function () {
      self.resizePicturesContainer()
    }, 10)
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
    const categoriesStyle = {
      opacity: (!this.state.picturesVisible) ? 1 : 0,
      visibility: (!this.state.picturesVisible) ? 'visible' : 'hidden'
    }

    const picturesStyle = {
      visibility: (!this.state.picturesVisible) ? 'hidden' : 'visible',
      opacity: (!this.state.picturesVisible) ? 0 : 1,
      width: this.state.picturesWidth
    }

    const pictureStyle = {
      width: this.state.pictureWidth,
      height: this.state.pictureHeight
    }

    return (
      <Motion onRest={onRest} style={{left: this.state.left}}>
        {value =>
          <div className='gallery-tab tab-page' ref={(t) => { this.root = t }} style={{left: value.left, display: this.state.display}}>
            <div className='categories' style={categoriesStyle}>
              {
                this.state.categories.map((data, i) => {
                  index++
                  return <Category key={i} index={index - 1} data={data} getApp={this.props.getApp} onClick={() => this.onCategoryClick(data)}>{data.name}</Category>
                })
              }
            </div>
            <div className='pictures' style={picturesStyle}>
              {
                this.state.pictures.map((data, i) => {
                  return <Picture key={i} data={data} getApp={this.props.getApp} image={data.url} style={pictureStyle} />
                })
              }
            </div>
          </div>}
      </Motion>
    )
  }
}
