import React from 'react'

import Category from './components/Category'
import Picture from './components/Picture'

export default class GalleryTab extends React.Component {
  constructor () {
    super()

    this.state = {
      categories: [],
      pictures: []
    }

    this.loadedCategories = 0

    this.toggledPictures = false
    this.toggledFullScreen = false

    this.fullScreenPictureWidth = 0
  }

  componentDidMount () {
    window.addEventListener('resize', this.changeFullScreenPictureSize)
  }

  /**
   * Changes full screen picture size by window width.
   */
  changeFullScreenPictureSize = () => {
    const fullScreenPicture = this.refs.fullScreenPicture

    if (this.fullScreenPictureWidth <= 0) {
      this.fullScreenPictureWidth = fullScreenPicture.width
    }

    if (window.innerWidth < this.fullScreenPictureWidth) {
      fullScreenPicture.classList.add('gallery-picture-full-screen-pic-small')
    } else {
      this.fullScreenPictureWidth = fullScreenPicture.width
      fullScreenPicture.classList.remove('gallery-picture-full-screen-pic-small')
    }
  }

  /**
   * Loads categories.
   */
  loadCategories = () => {
    const self = this
    const app = this.props.getApp()

    app.togglePreloader(true)
    app.selected.gallery = true
    app.canSelectTab = false

    setTimeout(function () {
      app.canSelectTab = false

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
    const app = this.props.getApp()

    this.loadedCategories++

    if (this.loadedCategories >= this.state.categories.length) {
      app.togglePreloader(false)
      app.canSelectTab = true
      this.refs.root.style.opacity = '1'
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
    const self = this
    const app = this.props.getApp()
    const toolbar = app.getToolBar()
    const navigationDrawer = app.refs.navigationDrawer
    const menuIcon = toolbar.refs.menuIcon
    const searchIcon = toolbar.refs.searchIcon
    const categories = this.refs.categories
    const pictures = this.refs.pictures

    searchIcon.hide(true)

    if (!navigationDrawer.toggled) {
      menuIcon.changeToArrow()
    } else {
      navigationDrawer.hide()
      menuIcon.changeToDefault()
      setTimeout(function () {
        menuIcon.changeToArrow()
      }, 200)
    }

    app.setToolBarTitle(data.name)
    app.hideTabLayout()

    categories.style.opacity = '0'

    setTimeout(function () {
      categories.style.display = 'none'
      pictures.style.opacity = '1'

      setTimeout(function () {
        self.setState({
          pictures: data.pictures
        })

        setTimeout(function () {
          pictures.style.display = 'block'
        }, 10)
      }, 10)
    }, 100)

    this.toggledPictures = true
  }

  /**
   * Hides pictures.
   */
  hidePictures = () => {
    const self = this
    const app = this.props.getApp()
    const toolbar = app.getToolBar()
    const searchIcon = toolbar.refs.searchIcon
    const categories = this.refs.categories
    const pictures = this.refs.pictures

    searchIcon.show()

    toolbar.refs.menuIcon.changeToDefault()

    app.setToolBarTitle(app.props.toolbarTitle)
    app.showTabLayout()

    pictures.style.opacity = '0'

    setTimeout(function () {
      categories.style.display = 'block'

      setTimeout(function () {
        categories.style.opacity = '1'

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
    const self = this
    const app = this.props.getApp()
    const fullScreen = this.refs.fullScreen
    const fullScreenBlur = this.refs.fullScreenBlur
    const fullScreenPicture = this.refs.fullScreenPicture
    const gradient = this.refs.gradient

    app.setState({
      toolbarShadow: false
    })

    app.setToolBarColor('transparent')

    fullScreenBlur.style.backgroundImage = 'url(' + img + ')'
    fullScreenPicture.src = img

    fullScreen.style.display = 'block'
    gradient.style.display = 'block'

    setTimeout(function () {
      fullScreen.style.opacity = '1'
    }, 10)

    this.changeFullScreenPictureSize()

    this.toggledFullScreen = true
  }

  /**
   * Hides full screen picture.
   */
  hideFullScreen = (img) => {
    const app = this.props.getApp()
    const fullScreen = this.refs.fullScreen
    const gradient = this.refs.gradient

    app.setState({
      toolbarShadow: true
    })

    app.setToolBarColor(app.props.toolbarBackgroundColor)

    fullScreen.style.opacity = '0'
    gradient.style.display = 'none'

    setTimeout(function () {
      fullScreen.style.display = 'none'
    }, 300)

    this.toggledFullScreen = false
  }

  /**
    * Gets root.
    * @param {DomElement}
    */
  getRoot = () => {
    return this.refs.root
  }

  render () {
    var picturesClass = 'gallery-pictures'
    if (this.state.pictures.length > 4) picturesClass += ' gallery-pictures-many'
    else if (this.state.pictures.length <= 2) picturesClass += ' gallery-pictures-' + this.state.pictures.length

    return (
      <div className='gallery-tab tab-page' ref='root'>
        <div className='gallery-categories' ref='categories'>
          {
            this.state.categories.map((data, i) => {
              return <Category key={i} data={data} getApp={this.props.getApp} onClick={this.onCategoryClick} onLoad={this.onCategoryLoad}>{data.name}</Category>
            })
          }
        </div>
        <div className={picturesClass} ref='pictures'>
          {
            this.state.pictures.map((data, i) => {
              return <Picture onClick={this.onPictureClick} key={i} image={data.url} />
            })
          }
        </div>
        <div className='gallery-picture-full-screen' ref='fullScreen'>
          <div className='gallery-picture-full-screen-blur' ref='fullScreenBlur' />
          <img className='gallery-picture-full-screen-pic' ref='fullScreenPicture' />
        </div>
        <div className='gallery-gradient' ref='gradient' />
      </div>
    )
  }
}
