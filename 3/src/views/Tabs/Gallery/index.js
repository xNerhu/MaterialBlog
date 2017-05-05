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
      fullPictureVisible: false,
      categories: [],
      pictures: []
    }

    this.isVisible = false

    this.root = null

    this.pictureWidth = 300
    this.pictureHeight = 200

    this.fullPictureWidth = 0
    this.fullPictureHeight = 0
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize)
  }

  /**
   * On window resize event.
   * @param {Object} event data
   */
  onResize = (e) => {
    if (this.state.picturesVisible) this.resizePicturesContainer()
  }

  /**
   * Resizes pictures container to windows width.
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
   * On category click event.
   * @param {Object} category data
   */
  onCategoryClick = (data) => {
    var self = this
    const navigationDrawer = this.props.getApp().refs.navigationDrawer

    this.props.getApp().getToolBar().setState({height: 64})
    this.props.getApp().setState({
      tabLayoutHidden: true
    })
    var toolbarItems = this.props.getApp().state.toolbarItems
    for (var i = 0; i < toolbarItems.length; i++) {
      if (toolbarItems[i].title !== undefined) {
        toolbarItems[i].title = data.name
        break
      }
    }

    if (navigationDrawer.state.toggled) {
      navigationDrawer.hide()
      this.props.getApp().getToolBar().refs.menuIcon.changeToDefault()
      setTimeout(function () {
        self.props.getApp().getToolBar().refs.menuIcon.changeToArrow()
      }, 100)
    } else {
      self.props.getApp().getToolBar().refs.menuIcon.changeToArrow()
    }

    this.showPictures(data)
  }

  /**
   * Shows all pictures from category.
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

  hidePictures = () => {
    var self = this

    this.props.getApp().getToolBar().setState({height: 128})
    this.props.getApp().setState({tabLayoutHidden: false})

    var toolbarItems = this.props.getApp().state.toolbarItems
    for (var i = 0; i < toolbarItems.length; i++) {
      if (toolbarItems[i].title !== undefined) {
        toolbarItems[i].title = this.props.getApp().props.toolbarTitle
        break
      }
    }

    this.props.getApp().getToolBar().refs.menuIcon.changeToDefault()

    this.setState({
      pictures: [],
      picturesVisible: false
    })
  }

  /**
   * On picture click event.
   * @param {Object} event data
   * @param {Object} picture data
   */
  onPictureClick = (e, data) => {
    var self = this
    var img = new Image()

    img.onload = function () {
      self.fullPictureBackground.src = this.src
      self.setState({
        picturesVisible: false,
        fullPictureVisible: true
      })
      self.props.getApp().setState({
        toolbarBackgroundColor: 'transparent',
        toolbarShadow: false
      })
      self.fullPictureBlur.style.backgroundImage = 'url(' + this.src + ')'
      self.fullPicture.style.backgroundImage = 'url(' + this.src + ')'
    }
    img.src = data.url
  }

  /**
   * Hides full screen picture.
   */
  hidefullPicture = () => {
    this.setState({
      picturesVisible: true,
      fullPictureVisible: false
    })
    this.props.getApp().setState({
      toolbarBackgroundColor: this.props.getApp().props.toolbarBackgroundColor,
      toolbarShadow: true
    })
  }

  /**
   * Checks that image is vertical or horizontal.
   * @param {int} image width
   * @param {int} image height
   * @return {boolean} is vertical
   */
  isVertical = (width, height) => {
    return (width <= height) ? true : false
  }

  /**
   * Gets image width proportionally to height.
   * @param {int} default image height
   * @param {int} default image width
   * @param {int} image height
   * @return {int} image width
   */
  getImageWidth = (imgHeight, imgWidth, height) => {
    return height * imgWidth / imgHeight
  }

  /**
   * Loads categories
   */
  loadCategories = () => {
    var self = this

    this.props.getApp().setState({
      dataPreloaderVisible: true
    })
    this.props.getApp().selected.gallery = true

    // TODO: make request
    setTimeout(function () {
      self.props.getApp().setState({
        dataPreloaderVisible: false
      })
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
    }, 1000)
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
      opacity: (!this.state.picturesVisible && !this.state.fullPictureVisible) ? 1 : 0,
      visibility: (!this.state.picturesVisible && !this.state.fullPictureVisible) ? 'visible' : 'hidden'
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

    const fullPictureStyle = {
      opacity: (!this.state.fullPictureVisible) ? 0 : 1,
      visibility: (!this.state.fullPictureVisible) ? 'hidden' : 'visible'
    }

    const fullPictureGradientStyle = {
      opacity: (!this.state.fullPictureVisible) ? 0 : 1,
      visibility: (!this.state.fullPictureVisible) ? 'hidden' : 'visible'
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
                  return <Picture key={i} data={data} getApp={this.props.getApp} image={data.url} style={pictureStyle} onClick={this.onPictureClick} isVertical={this.isVertical} getImageWidth={this.getImageWidth} />
                })
              }
            </div>
            <div className='full-picture' ref={(t) => { this.fullPicture = t }} style={fullPictureStyle}>
              <div className='full-picture-blur' ref={(t) => { this.fullPictureBlur = t }} />
              <img className='full-picture-background' ref={(t) => { this.fullPictureBackground = t }} />
            </div>
            <div className='full-picture-gradient' style={fullPictureGradientStyle} />
          </div>}
      </Motion>
    )
  }
}
