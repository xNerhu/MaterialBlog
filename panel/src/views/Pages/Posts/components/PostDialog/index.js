import Component from '../../../../../helpers/Component'
import DialogManager from '../../../../../helpers/DialogManager'

import FileInput from './components/FileInput'

import Post from './components/Post'

import TextField from '../../../../../imports/materialdesign/components/TextField'
import Switch from '../../../../../imports/materialdesign/components/Switch'

export default class PostDialog extends Component {
  beforeRender () {
    this.toggled = false

    this.previewToggled = false

    this.isEditMode = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Shows or hides dialog.
   * @param {Boolean} show or hide
   */
  toggle (flag, edit = false, postData) {
    const self = this
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

      toolbar.hideItems(false, false)

      multiIcon.changeToExit()

      setTimeout(function () {
        toolbar.toggleButton(true, saveButton)
      }, 150)

      if (edit) {
        this.isEditMode = edit

        saveButtonRoot.innerHTML = 'ZAPISZ'

        this.clearForm()

        setTimeout(function () {
          self.setForm(postData.title, postData.content, postData.media)
        }, 10)
      } else {
        saveButtonRoot.innerHTML = 'DODAJ'
      }

      if (!edit && this.isEditMode) {
        this.isEditMode = false

        this.clearForm()
      }
    } else {
      multiIcon.changeToDefault()

      toolbar.toggleButton(false, saveButton)

      setTimeout(function () {
        toolbar.showItems()
      }, 150)
    }

    DialogManager.toggleFullScreenDialog(flag, root)

    let toolbarTitle = app.defaultTitle

    if (flag && !edit) {
      toolbarTitle = 'Dodaj post'
    } else if (flag && edit) {
      toolbarTitle = 'Edytuj post'
    }

    toolbar.setTitle(toolbarTitle)

    this.toggled = flag
  }

  /**
   * Clears form.
   */
  clearForm () {
    const title = this.elements.titleTextField
    const content = this.elements.contentTextField
    const preview = this.elements.preview
    const fileInput = this.elements.fileInput
    const uploadInput = fileInput.elements.upload

    title.setValue('')
    content.setValue('')
    preview.setMedia(null)

    this.updatePreview()

    fileInput.toggleUploadValue(false, 1)
    uploadInput.value = ''
  }

  /**
   * Sets form.
   * @param {String} title
   * @param {String} content
   * @param {String} media
   */
  setForm (_title, _content, _media) {
    const title = this.elements.titleTextField
    const content = this.elements.contentTextField
    const preview = this.elements.preview
    const fileInput = this.elements.fileInput
    const uploadValue = fileInput.elements.value

    title.setValue(_title)
    content.setValue(_content)
    preview.setMedia(_media)

    if (_media != null) {
      uploadValue.innerHTML = _media
      fileInput.toggleUploadValue(true)
    }

    this.updatePreview()

    this.onInput(title)
    this.onInput(content)
  }

  /**
   * On switch.
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
  updatePreview () {
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
  parseDate (d) {
    if (d < 10) {
      d = '0' + d
    }

    return d
  }

  /**
   * Verify data.
   * @return {Boolean} data is correct
   */
  verifyData () {
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
   * On textfield input.
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
   * On textfield blur.
   * @param {TextField}
   */
  onBlur = (textField) => {
    if (textField.getInput().value.length < 1) textField.toggleError(true)
  }

  /**
   * On title textfield input.
   * @param {Event}
   */
  onTitleTextFieldInput = (e) => {
    this.onInput(this.elements.titleTextField)
  }

  /**
   * On title textfield blur.
   * @param {Event}
   */
  onTitleTextFieldBlur = (e) => {
    this.onBlur(this.elements.titleTextField)
  }

  /**
   * On content textfield input.
   * @param {Event}
   */
  onContentTextFieldInput = (e) => {
    this.onInput(this.elements.contentTextField)
  }

  /**
   * On content textfield blur.
   * @param {Event}
   */
  onContentTextFieldBlur = (e) => {
    this.onBlur(this.elements.contentTextField)
  }

  /**
   * On save post button click.
   * Adds or saves post.
   * TODO.
   * Closes add post dialog.
   * @param {Event}
   */
  onSavePostButtonClick = (e) => {
    const self = this
    const previewMedia = this.elements.preview.elements.mediaPic

    const app = window.app
    const postsPage = app.getPostsPage()
    const snackbar = app.elements.addPostSnackbar
    const snackbarText = snackbar.elements.text

    if (this.verifyData()) {
      this.toggle(false)

      snackbarText.innerHTML = (!this.isEditMode) ? 'Pomyślnie dodano post' : 'Pomyślnie zapisano post'
      snackbar.toggle(true)
      app.moveFAB(snackbar.getRoot().scrollHeight)

      const post = postsPage.clickedPost

      const title = this.elements.titleTextField.getValue()
      const content = this.elements.contentTextField.getValue()

      if (this.isEditMode) {
        const index = postsPage.postsData.indexOf(post.props.data)
        const media = (previewMedia.style.display !== 'none') ? previewMedia.src : null

        function updatePost (post, titleElement, contentElement, imgElement, title, content, media) {
          titleElement.innerHTML = title
          contentElement.innerHTML = content

          if (imgElement != null) {
            imgElement.style.display = (media == null) ? 'none' : 'inline-block'

            if (media != null) imgElement.src = media
          }
        }

        if (postsPage.listLoaded) {
          const postInList = postsPage.elements.list.items[index]
          const titleElement = postInList.elements.title.elements.text
          const contentElement = postInList.elements.content.elements.text
          const imgElement = post.elements.picture.elements.text.getElementsByTagName('img')[0]

          updatePost(postInList, titleElement, contentElement, imgElement, title, content, media)
        }

        if (postsPage.tableLoaded) {
          const postInTable = postsPage.elements.table.cells[index]
          const titleElement = postInTable.elements.title
          const contentElement = postInTable.elements.content
          const imgElement = postInTable.elements.picture.getElementsByTagName('img')[0]

          updatePost(postInTable, titleElement, contentElement, imgElement, title, content, media)
        }

        post.elements.title.innerHTML = title
        post.elements.content.innerHTML = content

        postsPage.postsData[index].title = title
        postsPage.postsData[index].content = content
        postsPage.postsData[index].media = media
      } else {
        const postData = {
          id: 11,
          media: 'http://img11.deviantart.net/a66d/i/2015/109/3/b/forest_wallpaper_16_9_by_iorgudesign-d8qa67w.jpg',
          title: title,
          author: 'Mikołaj Palkiewicz',
          content: content,
          date: '14.04.2017 10:38',
          avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
          likes: [],
          comments: []
        }

        const _postsData = []
        _postsData.push(postData)

        for (var i = 0; i < postsPage.postsData.length; i++) {
          _postsData.push(postsPage.postsData[i])
        }

        postsPage.postsData = _postsData

        if (postsPage.tableLoaded) {
          postsPage.elements.table.setCells(postsPage.postsData)
        }

        if (postsPage.listLoaded) {
          postsPage.elements.list.setCells(postsPage.postsData)
        }
      }

      setTimeout(function () {
        self.clearForm()
      }, 300)
    }
  }

  render () {
    return (
      <div className='post-dialog' ref='root'>
        <div className='post-dialog-container'>
          <TextField hint='Tytuł' ref='titleTextField' helperText='*Wymagane' />
          <TextField className='post-dialog-text-field-content' textarea={true} hint='Treść' placeholder='Można używać HTML oraz CSS' ref='contentTextField' helperText='*Wymagane' />
          <a href='https://www.w3schools.com/tags/' target='_blank'>
            Lista znaczników HTML
          </a>
          <FileInput ref='fileInput' />
          <div className='post-dialog-switch-container'>
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
