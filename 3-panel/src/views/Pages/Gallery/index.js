import Component from '../../../helpers/Component'

import PicturesDialog from './components/PicturesDialog'
import UploadPicturesDialog from './components/UploadPicturesDialog'

import Section from './components/Section'

export default class GalleryPage extends Component {
  beforeRender () {
    this.pageData = {
      title: 'Galeria',
      url: 'gallery',
      loaded: false
    }

    this.categoriesData = []

    this.months = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień'
    ]

    this.sectionLoaded = 0

    this.sectionsData = []
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * On select this page event.
   */
  onSelect = () => {
    const app = window.app

    app.toggleFAB(true)
  }

  /**
   * On deselect this page event.
   */
  onDeselect = (selectedPage) => {
    const app = window.app

    if (selectedPage !== app.getPostsPage()) {
      app.toggleFAB(false)
    }
  }

  /**
   * Loads categories.
   */
  load = () => {
    const self = this

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
          date: '20.04.2016',
          pictures: [
            'http://orig11.deviantart.net/20eb/f/2015/030/6/f/_minflat__dark_material_design_wallpaper__4k__by_dakoder-d8fjqzu.jpg',
            'https://4kwallpapers.co/wp-content/uploads/2015/07/Red-Dark-Material-Design-Ultra-HD-Wallpaper.jpg'
          ]
        },
        {
          name: 'Avatar',
          date: '17.04.2016',
          pictures: [
            'https://avatars2.githubusercontent.com/u/12050791?v=3&s=460'
          ]
        }
      ]

      for (var i = 0; i < self.categoriesData.length; i++) {
        const category = self.categoriesData[i]
        const split = category.date.split('.')

        const month = split[1]
        const year = split[2]

        const index = self.getSectionIndex(month, year)

        if (index < 0) {
          self.sectionsData.push(
            {
              month: month,
              year: year,
              categories: []
            }
          )

          self.sectionsData[self.sectionsData.length - 1].categories.push(category)
        } else {
          self.sectionsData[index].categories.push(category)
        }
      }

      for (var i = 0; i < self.sectionsData.length; i++) {
        let subheader = self.months[parseInt(self.sectionsData[i].month) - 1]
        const year = self.sectionsData[i].year

        const actualYear = new Date().getFullYear()

        if (year != actualYear) {
          subheader += ' ' + year
        }

        self.addSection(self.sectionsData[i].categories, subheader)
      }
    }, 10)
  }

  /**
   * Adds section.
   * @param {Object} categories
   * @param {String} month
   */
  addSection (data, subHeader) {
    const section = (
      <Section data={data} subHeader={subHeader} onLoad={this.onSectionLoad} onCategoryClick={this.onCategoryClick} />
    )

    this.renderComponents(section, this.elements.container)
  }

  /**
   * Gets section index.
   * @param {String} month
   * @return {Int} year
   */
  getSectionIndex = (month, year) => {
    for (var i = 0; i < this.sectionsData.length; i++) {
      if (this.sectionsData[i].month === month && this.sectionsData[i].year === year) {
        return i
      }
    }

    return -1
  }

  /**
   * On section load.
   */
  onSectionLoad = () => {
    this.sectionLoaded++

    if (this.sectionLoaded >= this.sectionsData.length) {
      const app = window.app

      const container = this.elements.container

      app.togglePreloader(false)
      app.pagesData.loading = false

      container.style.display = 'block'

      setTimeout(function () {
        container.style.opacity = '1'
      }, 10)
    }
  }

  /**
   * On category click event.
   * @param {Category} category
   */
  onCategoryClick = (category) => {
    this.elements.picturesDialog.toggle(true, category.props.data)
  }

  render () {
    return (
      <div className='page page-gallery' ref='root'>
        <div className='page-gallery-container' ref='container' />
        <PicturesDialog ref='picturesDialog' />
        <UploadPicturesDialog ref='uploadPicturesDialog' />
      </div>
    )
  }
}
