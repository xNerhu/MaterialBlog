import Component from '../../../../../helpers/Component'
import DialogManager from '../../../../../helpers/DialogManager'

import Picture from './components/Picture'

export default class PicturesDialog extends Component {
  beforeRender () {
    this.toggled = false

    this.toggledDeleteMode = false
    this.selectedPictures = []

    this.categoryData = {}
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Shows or hides dialog.
   * @param {Boolean} show or hide
   * @param {Object} category data
   */
  toggle (flag, data) {
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

      toolbar.showItem(toolbar.elements.menuIcon)
    } else {
      multiIcon.changeToDefault()

      toolbar.hideItem(toolbar.elements.menuIcon)
    }

    DialogManager.toggleFullScreenDialog(flag, root)

    const title = (flag) ? data.name : app.defaultTitle

    toolbar.setTitle(title)

    this.toggled = flag
  }

  /**
   * Adds pictures.
   */
  setItems () {
    this.setPicturesCount()

    for (var i = 0; i < this.categoryData.pictures.length; i++) {
      this.addPicture(this.categoryData.pictures[i])
    }
  }

  /**
   * Adds class which is count of pictures in the category.
   */
  setPicturesCount () {
    const container = this.elements.container
    const length = this.categoryData.pictures.length

    container.className = 'page-gallery-pictures-container'

    if (length >= 4) {
      container.classList.add('many')
    } else if (length <= 2) {
      container.classList.add('count-' + length)
    }
  }

  /**
   * Adds picture.
   * @param {String} image url
   */
  addPicture (url) {
    const element = (
      <Picture url={url} getPicturesDialog={() => { return this }} />
    )

    this.renderComponents(element, this.elements.container)
  }

  /**
   * Toggles delete mode.
   * @param {Boolean}
   */
  toggleDeleteMode (flag) {
    const app = window.app

    const toolbar = app.getToolbar()
    const multiIcon = toolbar.getMultiIcon()

    toolbar.toggleButton(flag, toolbar.elements.deleteButton)

    if (flag) {
      multiIcon.changeToExit()

      toolbar.hideItem(toolbar.elements.menuIcon)

      this.selectedPictures = []
      this.updateToolbarTitle()
    } else {
      multiIcon.changeToArrow()

      toolbar.setTitle(this.categoryData.name)

      setTimeout(function () {
        toolbar.showItem(toolbar.elements.menuIcon)
      }, 200)

      for (var i = 0; i < this.selectedPictures.length; i++) {
        const picture = this.selectedPictures[i]

        picture.selected = false
        picture.select(false)
      }
    }

    this.toggledDeleteMode = flag
  }

  /**
   * Updates toolbar title.
   */
  updateToolbarTitle () {
    window.app.getToolbar().setTitle('Usuń zaznaczone zdjęcia (' + this.selectedPictures.length + ')')
  }

  render () {
    return (
      <div className='full-screen-dialog page-gallery-pictures' ref='root'>
        <div className='page-gallery-pictures-container' ref='container' />
      </div>
    )
  }
}
