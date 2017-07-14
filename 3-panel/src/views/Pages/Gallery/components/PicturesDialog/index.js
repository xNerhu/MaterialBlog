import Component from '../../../../../helpers/Component'

import Picture from './components/Picture'

export default class PicturesDialog extends Component {
  beforeRender () {
    this.toggled = false

    this.categoryData = {
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
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Toggles pictures dialog.
   * @param {Boolean} show or hide
   * @param {Object} category data
   */
  toggle = (flag, data) => {
    const root = this.getRoot()
    const container = this.elements.container

    const app = window.app
    const toolbar = app.getToolbar()
    const multiIcon = toolbar.getMultiIcon()

    if (flag) {
      container.innerHTML = ''
      container.className = 'page-gallery-pictures-container'

      this.categoryData = data

      this.setItems()

      multiIcon.changeToArrow()
    } else {
      multiIcon.changeToDefault()
    }

    app.toggleFullScreenDialog(flag, root)

    const title = (flag) ? data.name : app.defaultTitle

    toolbar.setTitle(title)

    this.toggled = flag
  }

  /**
   * Adds pictures.
   */
  setItems = () => {
    const container = this.elements.container
    const length = this.categoryData.pictures.length

    if (length > 4) {
      container.classList.add('many')
    } else if (length <= 2) {
      container.classList.add('count-' + length)
    }

    for (var i = 0; i < length; i++) {
      this.addPicture(this.categoryData.pictures[i])
    }
  }

  /**
   * Adds picture.
   * @param {String} image url
   */
  addPicture = (url) => {
    const element = (
      <Picture url={url} getPictures={() => { return this }} />
    )

    this.renderComponents(element, this.elements.container)
  }

  render () {
    return (
      <div className='full-screen-dialog page-gallery-pictures' ref='root'>
        <div className='page-gallery-pictures-container' ref='container' />
      </div>
    )
  }
}
