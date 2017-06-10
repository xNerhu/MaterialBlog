import Category from './components/Category'

export default class GalleryTab {
  constructor () {
    this.elements = {}

    this.categoriesData = []
    this.categoryIndex = 0

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
            'http://s1.picswalls.com/thumbs2/2016/06/10/best-4k-wallpaper_065306859_309.jpg'
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
        const category = new Category(self.categoriesData[i], self.onCategoryLoad)
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

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'gallery-tab tab-page'

    // CATEGORIES
    this.elements.categories = document.createElement('div')
    this.elements.categories.className = 'gallery-categories'
    this.elements.root.appendChild(this.elements.categories)

    /*const x = new Category(
      {
        name: 'Test',
        date: '29.04.2017',
        pictures: [
          'http://s1.picswalls.com/wallpapers/2016/06/10/4k-background-wallpaper_065216608_309.jpg',
          'http://s1.picswalls.com/thumbs2/2016/06/10/4k-background_065335972_309.jpg',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWvnQ3zWCida1iD-z2jY0J2yQLE5PcdT84l2ObicCjk3daxVJ4YA',
          'https://i.ytimg.com/vi/uSJSPRQdLd8/maxresdefault.jpg'
        ]
      },
      this.onCategoryLoad
    )
    this.elements.categories.appendChild(x.getRoot())*/
  }
}
