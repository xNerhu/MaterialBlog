import Component from '../../../helpers/Component'
import Colors from '../../../helpers/Colors'

import Category from './components/Category'
import Picture from './components/Picture'

export default class GalleryTab extends Component {
  beforeRender () {
    this.categoriesData = []
    this.categoryIndex = 0
    this.fullScreenPictures = false
    this.fullScreenPicture = false

    this.fullScrenPictureSize = {
      width: 0,
      height: 0
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Loads categories.
   */
  load = () => {
    const self = this
    const app = window.app
    const categories = this.elements.categories

    app.tabsLoaded.gallery = true

    // TODO: Make request
    setTimeout(function () {
      self.categoriesData = [
        {
          name: '4K Wall papers',
          date: '10.06.2017',
          pictures: [
            'http://s1.picswalls.com/wallpapers/2016/06/10/4k-background-wallpaper_065216608_309.jpg',
            'http://s1.picswalls.com/thumbs2/2016/06/10/4k-images_065320942_309.jpg',
            'http://s1.picswalls.com/thumbs2/2016/06/10/4k-photo_065319874_309.jpg',
            'http://s1.picswalls.com/thumbs2/2016/06/10/4k-picture_065317474_309.jpg',
            'http://s1.picswalls.com/thumbs2/2016/06/10/4k-pictures_065316401_309.jpg',
            'http://s1.picswalls.com/thumbs2/2016/06/10/4k-wallpaper_06531428_309.jpg',
            'http://s1.picswalls.com/thumbs2/2016/06/10/beautiful-4k-background_065309630_309.jpg',
            'http://s1.picswalls.com/thumbs2/2016/06/10/best-4k-wallpaper_065306859_309.jpg',
            'https://static.pexels.com/photos/33109/fall-autumn-red-season.jpg',
            'http://www.wallpaperup.com/uploads/wallpapers/2016/06/24/991974/big_thumb_417501ac9b21edf40b5b4ffea1107041.jpg',
            'http://www.wallpaperup.com/uploads/wallpapers/2016/06/24/991972/big_thumb_6f203f6e57350091415a7db5c2d93241.jpg'
          ]
        },
        {
          name: 'Vertical Image Test',
          date: '29.04.2017',
          pictures: [
            'http://upload.wikimedia.org/wikipedia/commons/d/dc/Xemeneia_can_folch_vila_ol%C3%ADmpica_vertical.JPG'
          ]
        },
        {
          name: 'Test',
          date: '29.04.2017',
          pictures: [
            'http://s1.picswalls.com/thumbs2/2016/06/10/4k-background_065335972_309.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWvnQ3zWCida1iD-z2jY0J2yQLE5PcdT84l2ObicCjk3daxVJ4YA',
            'https://i.ytimg.com/vi/uSJSPRQdLd8/maxresdefault.jpg'
          ]
        },
        {
          name: 'Material Design',
          date: '25.04.2017',
          pictures: [
            'http://www.materialdoc.com/content/images/2015/11/materialdesign_introduction.png',
            'https://drivenlocal.com/wp-content/uploads/2015/10/Material-design.jpg'
          ]
        },
        {
          name: 'Material Design Dark',
          date: '20.04.2017',
          pictures: [
            'http://orig11.deviantart.net/20eb/f/2015/030/6/f/_minflat__dark_material_design_wallpaper__4k__by_dakoder-d8fjqzu.jpg',
            'https://4kwallpapers.co/wp-content/uploads/2015/07/Red-Dark-Material-Design-Ultra-HD-Wallpaper.jpg'
          ]
        },
        {
          name: 'Avatar',
          date: '17.04.2017',
          pictures: [
            'https://avatars2.githubusercontent.com/u/12050791?v=3&s=460'
          ]
        }
      ]

      for (let i = 0; i < self.categoriesData.length; i++) {
        const category = (
          <Category data={self.categoriesData[i]} onLoad={self.onCategoryLoad} onClick={self.onCategoryClick} />
        )

        self.renderComponents(category, categories)
      }
    }, 1000)
  }

  /**
   * On category load.
   */
  onCategoryLoad = () => {
    this.categoryIndex++
    if (this.categoryIndex >= this.categoriesData.length) {
      const app = window.app
      const categories = this.elements.categories

      categories.style.display = 'block'

      setTimeout(function () {
        categories.style.opacity = '1'
      }, 20)

      app.togglePreloader(false)
      app.isLoading = false
    }
  }

  /**
   * On category click event.
   * @param {Event}
   * @param {Category}
   */
  onCategoryClick = (e, category) => {
    const app = window.app
    const toolbar = app.getToolbar()
    const navigationDrawer = app.getNavigationDrawer()
    const multiIcon = toolbar.getMultiIcon()

    if (multiIcon.canClick) {
      if (navigationDrawer.toggled) {
        navigationDrawer.hide()
        multiIcon.changeToDefault()
      }

      this.togglePicturesFullScreen(true, category)
      multiIcon.blockClick()
    }
  }

  /**
   * Toggle pictures full screen.
   * @param {Boolean}
   * @param {Category}
   */
  togglePicturesFullScreen = (flag, category) => {
    const self = this
    const app = window.app
    const toolbar = app.getToolbar()
    const multiIcon = toolbar.getMultiIcon()
    const categories = this.elements.categories
    const pictures = this.elements.pictures

    toolbar.toggleTabs(!flag)

    if (flag) {
      const data = category.props.data
      const picturesLength = data.pictures.length

      pictures.className = 'gallery-pictures'
      if (picturesLength > 4) pictures.classList.add('gallery-pictures-many')
      else if (picturesLength <= 2) pictures.classList.add('gallery-pictures-' + picturesLength)

      categories.style.opacity = '0'
      setTimeout(function () {
        categories.style.display = 'none'

        pictures.style.display = 'block'
        setTimeout(function () {
          pictures.style.opacity = '1'
        }, 10)

        for (let i = 0; i < data.pictures.length; i++) {
          const picture = (
            <Picture url={data.pictures[i]} onClick={self.onPictureClick} />
          )

          self.renderComponents(picture, pictures)
        }
      }, 200)

      toolbar.hideItems(false, true, false)
      toolbar.setTitle(data.name)
      multiIcon.changeToArrow()
    } else {
      pictures.style.opacity = '0'
      setTimeout(function () {
        pictures.style.display = 'none'
        pictures.innerHTML = ''

        categories.style.display = 'block'
        setTimeout(function () {
          categories.style.opacity = '1'
        }, 10)
      }, 150)

      toolbar.showItems()
      toolbar.setTitle(app.props.defaultTitle)
      multiIcon.changeToDefault()
    }

    this.fullScreenPictures = flag
  }

  /**
   * On picture click event.
   * @param {Event}
   * @param {Picture}
   */
  onPictureClick = (e, pic) => {
    this.togglePictureFullScreen(true, pic)
  }

  /**
   * Shows or hides full screen picture.
   * @param {Boolean} show or hide.
   * @param {Picture}
   */
  togglePictureFullScreen = (flag, pic) => {
    const self = this
    const app = window.app
    const toolbar = app.getToolbar()
    const toolbarRoot = toolbar.getRoot()

    const pictureFullScreenContainer = this.elements.pictureFullScreenContainer
    const pictureFullScreenBlur = this.elements.pictureFullScreenBlur
    const pictureFullScreen = this.elements.pictureFullScreen
    const gradient = this.elements.gradient

    if (flag) {
      const url = pic.props.url

      toolbarRoot.classList.add('transparent')

      pictureFullScreenBlur.style.backgroundImage = 'url(' + url + ')'
      pictureFullScreen.src = url

      gradient.style.display = 'block'
      setTimeout(function () {
        gradient.style.opacity = '1'

        pictureFullScreenContainer.style.display = 'block'

        setTimeout(function () {
          pictureFullScreenContainer.style.opacity = '1'
          self.fullScrenPictureSize.width = pic.naturalWidth
          self.fullScrenPictureSize.height = pic.naturalHeight
          self.onWindowResize()
        }, 10)
      }, 10)

      window.addEventListener('resize', this.onWindowResize)
    } else {
      toolbarRoot.classList.remove('transparent')

      gradient.style.opacity = '0'
      setTimeout(function () {
        gradient.style.display = 'none'
      }, 300)

      pictureFullScreenContainer.style.opacity = '0'

      setTimeout(function () {
        pictureFullScreenContainer.style.display = 'none'
      }, 300)

      window.removeEventListener('resize', this.onWindowResize)
    }

    this.fullScreenPicture = flag
  }

  /**
   * On window resize event.
   * @param {Event}
   */
  onWindowResize = (e) => {
    const pictureFullScreen = this.elements.pictureFullScreen

    const naturalWidth = this.fullScrenPictureSize.width
    const naturalHeight = this.fullScrenPictureSize.height
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    const width = naturalWidth * windowHeight / naturalHeight

    if (width > windowWidth && pictureFullScreen.style.width !== '100%') {
      pictureFullScreen.style.width = '100%'
      pictureFullScreen.style.height = 'auto'
    } else if (width < windowWidth && pictureFullScreen.style.width === '100%') {
      pictureFullScreen.style.width = 'auto'
      pictureFullScreen.style.height = '100%'
    }
  }

  render () {
    return (
      <div className='gallery-tab tab-page' ref='root'>
        <div className='gallery-categories' ref='categories' />
        <div className='gallery-pictures' ref='pictures' />
        <div className='gallery-picture-full-screen-container' ref='pictureFullScreenContainer'>
          <div className='gallery-picture-full-screen-blur' ref='pictureFullScreenBlur' />
          <img className='gallery-picture-full-screen' ref='pictureFullScreen' />
        </div>
        <div className='gallery-gradient' ref='gradient' />
      </div>
    )
  }
}
