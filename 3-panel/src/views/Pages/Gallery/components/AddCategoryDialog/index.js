import Component from '../../../../../helpers/Component'
import CategoryDialog from '../../../../../helpers/CategoryDialog'

import Dialog from '../../../../../imports/materialdesign/components/Dialog'

import TextField from '../../../../../imports/materialdesign/components/TextField'
import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class AddCategoryDialog extends Component {
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
        text: 'DODAJ',
        onClick: this.onAddCategoryButtonClick
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
   * On dialog action button add category click event.
   * @param {Event}
   */
  onAddCategoryButtonClick = (e) => {
    CategoryDialog.checkForErrors(this, function (error, title) {
      if (!error) {
        const snackbar = window.app.elements.addedCategorySnackbar

        snackbar.toggle(true)

        const app = window.app

        const gallery = app.getGalleryPage()
        const date = new Date()

        function getDate (d) {
          return (d < 10) ? ('0' + d) : d
        }

        const day = getDate(date.getDate())
        const month = getDate(date.getMonth() + 1)
        const year = date.getFullYear()

        const _categoriesData = []

        _categoriesData.push({
          name: title,
          date: day + '.' + month + '.' + year,
          pictures: []
        })

        for (var i = 0; i < gallery.categoriesData.length; i++) {
          _categoriesData.push(gallery.categoriesData[i])
        }

        gallery.categoriesData = _categoriesData

        gallery.sectionLoaded = 0
        gallery.sectionsData = []
        gallery.elements.container.innerHTML = ''
        gallery.addSections()
      }
    })
  }

  render () {
    return (
      <div className='category-dialog' ref='root'>
        <Dialog title='Dodaj nową kategorię' ref='dialog'>
          <TextField ref={(e) => this.categoryNameTextField = e} hint='Nazwa' helperText='*Wymagane' maxLength={30} />
          <Preloader ref={(e) => this.preloader = e} />
        </Dialog>
      </div>
    )
  }

  afterRender () {
    this.setDialogItems()
  }
}
