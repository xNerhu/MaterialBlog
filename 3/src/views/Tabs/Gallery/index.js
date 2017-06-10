import Category from './components/Category'
import Picture from './components/Picture'

export default class GalleryTab {
  constructor () {
    this.elements = {}

    this.categoriesData = []
    this.categoryIndex = 0
    this.fullScreenPictures = false

    this.render()
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
        const category = new Category(self.categoriesData[i], self.onCategoryClick, self.onCategoryLoad)
        const categoryRoot = category.getRoot()

        categories.appendChild(categoryRoot)
      }
    }, 10)
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
      }, 10)

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
    this.toggleFullScreenPictures(true, category)
  }

  /**
   * Toggle full screen pictures.
   * @param {Boolean}
   * @param {Category}
   */
  toggleFullScreenPictures = (flag, category) => {
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
          const picture = new Picture(data.pictures[i])
          pictures.appendChild(picture.getRoot())
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
    multiIcon.blockClick()
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'gallery-tab tab-page'

    // CATEGORIES
    this.elements.categories = document.createElement('div')
    this.elements.categories.className = 'gallery-categories'
    this.elements.root.appendChild(this.elements.categories)

    // PICTURES
    this.elements.pictures = document.createElement('div')
    this.elements.pictures.className = 'gallery-pictures'
    this.elements.root.appendChild(this.elements.pictures)
  }
}
