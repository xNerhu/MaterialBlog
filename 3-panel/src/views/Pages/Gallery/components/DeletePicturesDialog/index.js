import Component from '../../../../../helpers/Component'

import Dialog from '../../../../../imports/materialdesign/components/Dialog'

import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class DeletePicturesDialog extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Sets dialog action buttons.
   */
  setDialogItems () {
    const dialog = this.elements.dialog

    const items = [
      {
        text: 'USUŃ',
        onClick: this.onDeleteButtonClick
      },
      {
        text: 'ANULUJ',
        onClick: function () {
          dialog.toggle(false)
        }
      }
    ]

    dialog.setItems(items)
  }

  /**
   * On dialog action button delete category click event.
   * @param {Event}
   */
  onDeleteButtonClick = (e) => {
    const self = this

    const root = this.getRoot()
    const dialog = this.elements.dialog

    root.classList.add('category-dialog-preloader')

    dialog.setItems([])

    const app = window.app

    const galleryPage = app.getGalleryPage()
    const picturesDialog = galleryPage.elements.picturesDialog
    const selectedPictures = picturesDialog.selectedPictures

    setTimeout(function () {
      for (var i = 0; i < selectedPictures.length; i++) {
        const picture = selectedPictures[i]

        const categoryIndex = galleryPage.categoriesData.indexOf(picturesDialog.categoryData)
        const category = galleryPage.categoriesData[categoryIndex]
        const picIndex = category.pictures.indexOf(picture.props.url)

        category.pictures.splice(picIndex, 1)

        picture.getRoot().style.display = 'none'
      }

      root.classList.remove('category-dialog-preloader')

      picturesDialog.toggleDeleteMode(false)
      picturesDialog.setPicturesCount()
      self.setDialogItems()
      dialog.toggle(false)
      app.elements.deletePicturesSnackbar.toggle(true)
    }, 500)
  }

  render () {
    return (
      <div className='delete-category-dialog' ref='root'>
        <Dialog title='Czy napewno chcesz usunąć zaznaczone zdjęcia?' ref='dialog'>
          <div className='text'>
            Nie będzie można tego cofnąć.
          </div>
          <Preloader />
        </Dialog>
      </div>
    )
  }

  afterRender () {
    this.setDialogItems()
  }
}
