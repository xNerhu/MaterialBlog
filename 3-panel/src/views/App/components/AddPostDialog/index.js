import Component from './../../../../helpers/Component'

import FileInput from './components/FileInput'

import Post from './components/Post'

import TextField from '../../../../imports/materialdesign/components/TextField'
import Switch from '../../../../imports/materialdesign/components/Switch'

export default class AddPostDialog extends Component {
  beforeRender () {
    this.toggled = false

    this.previewToggled = false
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

    app.toggleFAB(!flag)

    if (flag) {
      if (navigationDrawer.toggled) navigationDrawer.hide()

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
    } else {
      toolbar.setTitle(app.defaultTitle)

      multiIcon.changeToDefault()

      saveButtonRoot.style.opacity = '0'

      setTimeout(function () {
        saveButtonRoot.style.display = 'none'

        setTimeout(function () {
          toolbar.showItems()
        }, 10)
      }, 150)

      root.style.opacity = '0'

      setTimeout(function () {
        root.style.display = 'none'
      }, 300)
    }

    this.toggled = flag
  }

  /**
   * On switch event.
   * @param {Boolean} switch state
   */
  onSwitch = (flag) => {
    const preview = this.elements.preview
    const previewRoot = preview.getRoot()

    previewRoot.style.height = previewRoot.scrollHeight + 'px'

    if (flag) {
      this.updatePreview()

      setTimeout(function () {
        previewRoot.style.height = 'auto'
      }, 250)
    } else {
      setTimeout(function () {
        previewRoot.style.height = '0px'
      }, 10)
    }

    this.previewToggled = flag
  }

  /**
   * Updates preview title and content.
   */
  updatePreview = () => {
    const title = this.elements.titleTextField.getInput().value
    const content = this.elements.contentTextField.getInput().value

    const preview = this.elements.preview

    const previewTitle = preview.elements.title
    const previewSubTitle = preview.elements.subTitle
    const previewContent = preview.elements.content

    previewTitle.innerHTML = title
    previewContent.innerHTML = content

    const date = new Date()
    const day = this.parseDate(date.getDate())
    const month = this.parseDate(date.getMonth())
    const year = date.getFullYear()
    let hour = this.parseDate(date.getHours())
    let minute = this.parseDate(date.getMinutes())

    const _date = window.app.accountInfo.userName + ', ' + day + '.' + month + '.' + year + ' ' + hour + ':' + minute
    previewSubTitle.innerHTML = _date
  }

  /**
   * Parse date if is less than 10.
   * @param {Int}
   * @return {String}
   */
  parseDate = (d) => {
    if (d < 10) {
      d = '0' + d
    }

    return d
  }

  /**
   * Verify data.
   * @return {Boolean} data is correct
   */
  verifyData = () => {
    const titleTextField = this.elements.titleTextField
    const contentTextField = this.elements.contentTextField

    const title = titleTextField.getInput().value
    const content = contentTextField.getInput().value

    let correct = true

    if (title.length < 1) {
      titleTextField.toggleError(true)

      correct = false
    }

    if (content.length < 1) {
      contentTextField.toggleError(true)

      correct = false
    }

    return correct
  }

  /**
   * On textfield input event.
   * Updates preview post.
   * @param {TextField}
   */
  onInput = (textField) => {
    if (this.previewToggled) {
      this.updatePreview()
    }

    const input = textField.getInput()

    if (input.value.length > 0 && textField.error) {
      textField.toggleError(false)
    } else if (input.value.length < 1 && !textField.error) {
      textField.toggleError(true)
    }
  }

  /**
   * On textfield blur event.
   * @param {TextField}
   */
  onBlur = (textField) => {
    if (textField.getInput().value.length < 1) textField.toggleError(true)
  }

  /**
   * On title textfield input event.
   * @param {Event}
   */
  onTitleTextFieldInput = (e) => {
    this.onInput(this.elements.titleTextField)
  }

  /**
   * On title textfield blur event.
   * @param {Event}
   */
  onTitleTextFieldBlur = (e) => {
    this.onBlur(this.elements.titleTextField)
  }

  /**
   * On content textfield input event.
   * @param {Event}
   */
  onContentTextFieldInput = (e) => {
    this.onInput(this.elements.contentTextField)
  }

  /**
   * On content textfield blur event.
   * @param {Event}
   */
  onContentTextFieldBlur = (e) => {
    this.onBlur(this.elements.contentTextField)
  }

  render () {
    return (
      <div className='add-post-dialog' ref='root'>
        <div className='add-post-dialog-container'>
          <TextField hint='Tytuł' ref='titleTextField' helperText='*Wymagane' />
          <TextField className='add-post-dialog-text-field-content' textarea={true} hint='Treść' placeholder='Można używać HTML oraz CSS' ref='contentTextField' helperText='*Wymagane' />
          <a href='https://www.w3schools.com/tags/' target='_blank'>
            Lista znaczników HTML
          </a>
          <FileInput ref='fileInput' />
          <div className='add-post-dialog-switch-container'>
            <div className='text'>
              Podgląd
            </div>
            <Switch ref='switch' onSwitch={this.onSwitch} />
          </div>
        </div>
        <Post ref='preview' />
      </div>
    )
  }

  afterRender () {
    const title = this.elements.titleTextField.getInput()
    const content = this.elements.contentTextField.getInput()

    title.addEventListener('input', this.onTitleTextFieldInput)
    title.addEventListener('blur', this.onTitleTextFieldBlur)

    content.addEventListener('input', this.onContentTextFieldInput)
    content.addEventListener('blur', this.onContentTextFieldBlur)
  }
}
