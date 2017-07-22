import Component from '../../../../../helpers/Component'

import Dialog from '../../../../../imports/materialdesign/components/Dialog'

import TextField from '../../../../../imports/materialdesign/components/TextField'
import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class AddCategoryDialog extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Sets dialog action buttons.
   */
  setDialogItems = () => {
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
    const self = this
    const textField = this.categoryNameTextField
    const textFieldRoot = textField.getRoot()
    const name = textField.getValue()
    const preloader = this.preloader
    const preloaderRoot = preloader.getRoot()

    if (name.length < 1 && !textField.error) {
      textField.toggleError(true)
    } else if (name.length > 0) {
      textFieldRoot.style.display = 'none'
      preloaderRoot.style.display = 'block'

      const dialog = this.elements.dialog

      dialog.setItems([])

      setTimeout(function () {
        const snackbar = window.app.elements.addedCategorySnackbar

        dialog.toggle(false)
        snackbar.toggle(true)

        textFieldRoot.style.display = 'block'
        preloaderRoot.style.display = 'none'

        textField.setValue('')

        self.setDialogItems()
      }, 500)
    }
  }

  render () {
    return (
      <div className='add-category-dialog' ref='root'>
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
