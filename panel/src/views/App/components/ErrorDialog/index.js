import Component from '../../../../helpers/Component'

import Dialog from '../../../../imports/materialdesign/components/Dialog'

export default class ErrorDialog extends Component {
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
        text: 'ZAMKNIJ',
        onClick: function () {
          dialog.toggle(false)
        }
      }
    ]

    dialog.setItems(items)
  }

  /**
   * Sets text and shows dialog.
   * @param {String}
   */
  show (content) {
    this.text.innerHTML = content
    this.elements.dialog.toggle(true)
  }

  render () {
    return (
      <div className='error-dialog' ref='root'>
        <Dialog title='Błąd' ref='dialog'>
          <div className='text' ref={(e) => this.text = e} />
        </Dialog>
      </div>
    )
  }

  afterRender () {
    this.setDialogItems()
  }
}
