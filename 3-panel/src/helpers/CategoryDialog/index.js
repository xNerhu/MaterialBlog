export default class CategoryDialog {
  static checkForErrors (categoryDialog, callback) {
    const root = categoryDialog.getRoot()

    const textField = categoryDialog.categoryNameTextField
    const name = textField.getValue()

    if (name.length < 1 && !textField.error || name.length > 30) {
      textField.toggleError(true)
      callback(true)
    } else if (name.length > 0) {
      const dialog = categoryDialog.elements.dialog

      dialog.setItems([])

      setTimeout(function () {
        dialog.toggle(false)

        root.classList.remove('enabled-preloader')

        textField.setValue('')

        categoryDialog.setDialogItems()

        callback(false, name)
      }, 500)

      root.classList.add('enabled-preloader')
    }
  }
}
