export default class DialogManager {
  /**
   * Shows or hides full screen dialog.
   * @param {Boolean}
   * @param {DOMElement}
   */
  static toggleFullScreenDialog (flag, root) {
    root.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      root.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 10 : 300)
  }

  static checkForErrors (dialog) {
    const textField = dialog.textField
    const name = textField.getValue()

    if (name.length < 1 && !textField.error || name.length > textField.props.maxLength) {
      textField.toggleError(true)
      return true
    } else if (name.length > 0) {
      return false
    }
  }
}
