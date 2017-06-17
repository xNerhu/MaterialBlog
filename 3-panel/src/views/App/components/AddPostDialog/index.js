import Component from './../../../../helpers/Component'

import FileInput from './components/FileInput'

import TextField from '../../../../imports/materialdesign/components/TextField'
import Switch from '../../../../imports/materialdesign/components/Switch'

export default class AddPostDialog extends Component {
  beforeRender () {
    this.persistent = true
    this.toggled = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Toggle dialog.
   * @param {Boolean} show or hide
   */
  toggle = (flag) => {
    const root = this.getRoot()

    const app = window.app
    const navigationDrawer = app.getNavigationDrawer()
    const toolbar = app.getToolbar()
    const multiIcon = toolbar.getMultiIcon()
    const saveButton = toolbar.elements.saveButton
    const saveButtonRoot = saveButton.getRoot()

    if (navigationDrawer.toggled) navigationDrawer.hide()

    app.toggleFAB(false)

    toolbar.setTitle('Dodaj post')
    toolbar.hideItems(false, false)

    multiIcon.changeToExit()

    setTimeout(function () {
      saveButtonRoot.style.display = 'block'

      setTimeout(function () {
        saveButtonRoot.style.opacity = '1'
      }, 20)
    }, 100)

    root.style.display = 'block'

    setTimeout(function () {
      root.style.opacity = '1'
    }, 20)
  }

  render () {
    return (
      <div className='add-post-dialog' ref='root'>
        <div className='container'>
          <TextField className='text-field-title' hint='Tytuł' />
          <TextField textarea={true} hint='Treść' placeholder='Można używać HTML, CSS oraz JavaScript' />
          <FileInput ref='FileInput' />
          <img className='media' ref='media' draggable='false' />
          <Switch />
        </div>
      </div>
    )
  }

  afterRender () {
    const self = this

    setTimeout(function () {
      self.toggle(true)
    }, 100)
  }
}
