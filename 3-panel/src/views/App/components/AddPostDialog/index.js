import Component from './../../../../helpers/Component'

import FileInput from './components/FileInput'

import Post from './components/Post'

import TextField from '../../../../imports/materialdesign/components/TextField'
import Switch from '../../../../imports/materialdesign/components/Switch'

export default class AddPostDialog extends Component {
  beforeRender () {
    this.persistent = true
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
    const title = this.elements.textFieldTitle.getInput().value
    const content = this.elements.textFieldContent.getInput().value

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
   * On input event.
   * Updates preview post.
   * @param {Event}
   */
  onInput = (e) => {
    if (this.previewToggled) {
      this.updatePreview()
    }
  }

  /**
   * Parse date if is less than 10.
   */
  parseDate = (d) => {
    if (d < 10) {
      d = '0' + d
    }

    return d
  }

  render () {
    return (
      <div className='add-post-dialog' ref='root'>
        <div className='container'>
          <TextField className='text-field-title' hint='Tytuł' ref='textFieldTitle' />
          <TextField textarea={true} hint='Treść' placeholder='Można używać HTML, CSS oraz JavaScript' ref='textFieldContent' />
          <FileInput ref='fileInput' />
          <div className='switch-container'>
            <div className='text'>
              Podgląd
            </div>
            <Switch ref='switch' onSwitch={this.onSwitch} />
          </div>
          <Post ref='preview' />
        </div>
      </div>
    )
  }

  afterRender () {
    const self = this

    setTimeout(function () {
      self.toggle(true)
    }, 100)

    const title = this.elements.textFieldTitle.getInput()
    const content = this.elements.textFieldContent.getInput()

    title.addEventListener('input', this.onInput)
    content.addEventListener('input', this.onInput)
  }
}
