export default class CategoryDialog {
  static checkForErrors (categoryDialog) {
    const textField = categoryDialog.textField
    const name = textField.getValue()

    if (name.length < 1 && !textField.error || name.length > 30) {
      textField.toggleError(true)

      return true
    } else if (name.length > 0) {
      return false
    }
  }
}
