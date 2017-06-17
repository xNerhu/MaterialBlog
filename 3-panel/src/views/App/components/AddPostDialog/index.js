import Component from './../../../../helpers/Component'
import Url from './../../../../helpers/Url'

import TextField from '../../../../imports/materialdesign/components/TextField'
import MaterialButton from '../../../../imports/materialdesign/components/MaterialButton'

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

  /**
   * On upload button click event.
   * Triggers input click.
   * @param {Event}
   */
  onUploadButtonClick = (e) => {
    const input = this.elements.upload

    input.click()
  }

  /**
   * On upload input change event.
   * Shows or hides field with file name.
   * @param {Event}
   */
  onUploadInputChange = (e) => {
    const input = this.elements.upload
    const value = input.value

    const uploadValue = this.elements.uploadValue
    const indicator = this.elements.uploadValueIndicator

    if (value === '') {
      uploadValue.style.opacity = '0'
      indicator.style.width = '0%'

      setTimeout(function () {
        uploadValue.innerHTML = value
      }, 300)
    } else {
      uploadValue.innerHTML = Url.extractFileName(value)

      setTimeout(function () {
        uploadValue.style.opacity = '1'
        indicator.style.width = '100%'
      }, 1)
    }

    /*let reader = new FileReader()

    reader.onload = function (e) {

    }
    const test =this.elements.test
    reader.onprogress = function (e) {
      if (e.lengthComputable) {
          var progress = parseInt( ((e.loaded / e.total) * 100), 10 );
          console.log(progress);
          test.setProgress(progress)
      }
    }

    reader.readAsDataURL(input.files[0])*/
  }

  render () {
    return (
      <div className='add-post-dialog' ref='root'>
        <div className='add-post-dialog-container'>
          <TextField className='add-post-dialog-title' hint='Tytuł' />
          <TextField textarea={true} hint='Treść' placeholder='Można używać HTML, CSS oraz JavaScript' />
          <div className='add-post-dialog-container-uplad-container'>
            <MaterialButton onClick={this.onUploadButtonClick} className='add-post-dialog-upload-button' text='Dodaj zdjęcie' />
            <div className='add-post-dialog-value'>
              <div className='value' ref='uploadValue' />
              <div className='indicator' ref='uploadValueIndicator' />
            </div>
          </div>
        </div>
        <input className='add-post-dialog-upload-input' ref='upload' type='file' name='pic' accept='image/*' onChange={this.onUploadInputChange} />
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
