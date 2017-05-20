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

    this.toggledPictures = false
    this.toggledFullScreen = false
  }

  /**
   * Loads categories.
   */
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

  /**
   * On category load event.
   */
  onCategoryLoad = () => {
    this.loadedCategories++
    if (this.loadedCategories >= this.state.categories.length) {
      this.props.getApp().setState({
        dataPreloaderVisible: false
      })
      this.props.getApp().canSelectTab = true
    }
  }

  /**
   * On category click event.
   * @param {Object} event data.
   * @param {Object} category data.
   */
  onCategoryClick = (e, data) => {
    this.showPictures(data)
  }

  /**
   * Shows pictures.
   * @param {Object} category data.
   */
  showPictures = (data) => {
    var self = this
    var app = this.props.getApp()
    var toolbar = app.getToolBar()

    // Change menu to arrow.
    toolbar.refs.menuIcon.changeToArrow()

    var toolBarItems = app.state.toolbarItems
    var toolBarTitleIndex = 0

    // Get title index.
    for (var i = 0; i < toolBarItems.length; i++) {
      if (toolBarItems[i].type === 'Title') {
        toolBarTitleIndex = i
        break
      }
    }

    // Change title.
    toolBarItems[toolBarTitleIndex].title = data.name
    app.setState({
      toolbarItems: toolBarItems
    })

    // Hide tabbar.
    toolbar.setState({
      height: 64
    })
    app.setState({
      tabLayoutHidden: true
    })

    this.categories.style.opacity = '0'

    setTimeout(function () {
      self.categories.style.display = 'none'
      self.pictures.style.opacity = '1'
      setTimeout(function () {
        self.setState({
          pictures: data.pictures
        })
        setTimeout(function () {
          self.pictures.style.display = 'block'
        }, 10)
      }, 10)
    }, 100)

    this.toggledPictures = true
  }

  /**
   * Hides pictures.
   */
  hidePictures = () => {
    var self = this
    var app = this.props.getApp()
    var toolbar = app.getToolBar()

    // Change menu to default.
    toolbar.refs.menuIcon.changeToDefault()

    var toolBarItems = app.state.toolbarItems
    var toolBarTitleIndex = 0

    // Get title index.
    for (var i = 0; i < toolBarItems.length; i++) {
      if (toolBarItems[i].type === 'Title') {
        toolBarTitleIndex = i
        break
      }
    }

    // Change title.
    toolBarItems[toolBarTitleIndex].title = app.props.toolbarTitle
    app.setState({
      toolbarItems: toolBarItems
    })

    // Hide tabbar.
    toolbar.setState({
      height: 128
    })
    app.setState({
      tabLayoutHidden: false
    })

    this.pictures.style.opacity = '0'
    setTimeout(function () {
      self.categories.style.display = 'block'
      setTimeout(function () {
        self.categories.style.opacity = '1'
        setTimeout(function () {
          self.setState({
            pictures: []
          })
        }, 300)
      }, 10)
    }, 200)
    this.toggledPictures = false
  }

  /**
   * On picture click event.
   * @param {Object} event data.
   * @param {String} image url.
   */
  onPictureClick = (e, img, width, height) => {
    this.showFullScreen(e, img)
  }

  /**
   * Shows full screen picture.
   * @param {String} image url.
   */
  showFullScreen = (e, img) => {
    var self = this

    this.props.getApp().setState({
      toolbarBackgroundColor: 'transparent',
      toolbarShadow: false
    })

    this.fullScreenBlur.style.backgroundImage = 'url(' + img + ')'
    this.fullScreenPicture.style.backgroundImage = 'url(' + img + ')'

    this.fullScreen.style.display = 'block'
    this.gradient.style.display = 'block'
    setTimeout(function () {
      self.fullScreen.style.opacity = '1'
    }, 10)

    this.toggledFullScreen = true
  }

  /**
   * Hides full screen picture.
   */
   hideFullScreen = (img) => {
     var self = this
     var app = this.props.getApp()

     app.setState({
       toolbarBackgroundColor: app.props.toolbarBackgroundColor,
       toolbarShadow: true
     })

     this.fullScreen.style.opacity = '0'
     this.gradient.style.display = 'none'
     setTimeout(function () {
       self.fullScreen.style.display = 'none'
     }, 300)

     this.toggledFullScreen = false
   }

  render () {
    var self = this
    function onRest () {
      if (!self.isVisible) {
        self.setState({display: 'none'})
      }
    }

    var picturesClass = 'gallery-pictures'
    if (this.state.pictures.length > 4) picturesClass += ' gallery-pictures-many'
    else if (this.state.pictures.length <= 2) picturesClass += ' gallery-pictures-' + this.state.pictures.length

    return (
      <Motion onRest={onRest} style={{left: this.state.left}}>
        {value =>
          <div className='gallery-tab tab-page' ref={(t) => { this.root = t }} style={{left: value.left, display: this.state.display}}>
            <div className='gallery-categories' ref={(t) => { this.categories = t }}>
              {
                this.state.categories.map((data, i) => {
                  return <Category key={i} data={data} getApp={this.props.getApp} onClick={this.onCategoryClick} onLoad={this.onCategoryLoad}>{data.name}</Category>
                })
              }
            </div>
            <div className={picturesClass} ref={(t) => { this.pictures = t }}>
              {
                this.state.pictures.map((data, i) => {
                  return <Picture onClick={this.onPictureClick} key={i} image={data.url} />
                })
              }
            </div>
            <div className='gallery-picture-full-screen' ref={(t) => { this.fullScreen = t }}>
              <div className='gallery-picture-full-screen-blur' ref={(t) => { this.fullScreenBlur = t }} />
              <div className='gallery-picture-full-screen-pic' ref={(t) => { this.fullScreenPicture = t }} />
            </div>
            <div className='gallery-gradient' ref={(t) => { this.gradient = t }} />
          </div>}
      </Motion>
    )
  }
}
