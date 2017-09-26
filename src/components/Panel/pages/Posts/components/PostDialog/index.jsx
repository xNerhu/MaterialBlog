import Component from 'inferno-component'

import { addPost, editPost } from '../../../../../../actions/posts'

import Post from '../../../../../Post'

import TextField from '../../../../../../materialdesign/components/TextField'
import MaterialButton from '../../../../../../materialdesign/components/MaterialButton'
import Switch from '../../../../../../materialdesign/components/Switch'

export default class PostDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.touched = false
    this.state = {
      fileViewText: '',
      postData: {
        _id: '',
        media: '',
        title: ' ',
        author: '',
        authorInfo: {},
        content: '',
        date: '15.06.2017 13:02',
        avatar: '',
        likes: [],
        comments: []
      }
    }

    this.toggled = false
    this.toggledPostView = false
    this.isEditingMode = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  toggle (flag, post = false) {
    const root = this.getRoot()

    const panel = window.panel
    const toolbar = panel.elements.toolbar
    const multiIcon = toolbar.elements.multiIcon

    const titleTextField = this.elements.titleTextField
    const contentTextField = this.elements.contentTextField

    if (flag && panel.elements.navigationDrawer.toggled) panel.elements.navigationDrawer.hide()

    if (flag) {
      panel.elements.navigationDrawer.hide()

      const _postData = this.state.postData

      _postData.authorInfo.username = panel.state.userInfo.username
      _postData.authorInfo.avatar = panel.state.userInfo.avatar

      this.setState({
        _postData
      })
    }

    // Toggle floating action button
    panel.toggleFAB(!flag)

    // Set toolbar title
    let toolbarTitle = panel.defaultToolbarTitle
    if (flag && !post) toolbarTitle = 'Dodaj post'
    else if (flag && post) toolbarTitle = 'Edytowanie posta'

    panel.setState({
      toolbarTitle: toolbarTitle
    })

    // Change multi icon to exit or to menu
    if (flag) multiIcon.changeToExit()
    else multiIcon.changeToDefault()

    toolbar.toggleItemsAndButton(flag, panel.postsPageToolbarItems, panel.elements.toolbarSaveButton)

    // Toggle post dialog
    root.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      root.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 200)

    this.toggled = flag

    // If is editing mode
    if (flag) {
      if (post) {
        const data = post.props.data

        // Set post title and content
        titleTextField.setValue(data.title)
        contentTextField.setValue(data.content)

        // Set post media
        const postData = this.state.postData
        postData.media = data.media

        postData._id = data._id

        // Update username and avatar in post demo
        if (data.author !== panel.state.userInfo._id) {
          postData._id = data._id
          postData.authorInfo.username = data.authorInfo.username
          postData.authorInfo.avatar = data.authorInfo.avatar
        }

        this.setState({
          postData,
          fileViewText: data.media
        })

        if (data.media != null && data.media !== '') {
          this.toggleFileView(true)
        } else {
          this.toggleFileView(false)
        }

        this.isEditingMode = true
      } else if (this.isEditingMode) {
        // Clear form
        titleTextField.setValue('')
        contentTextField.setValue('')

        const postData = this.state.postData
        postData._id = ''
        postData.title = ''
        postData.content = ''
        postData.media = ''

        this.setState({
          postData,
          fileViewText: ''
        })

        this.toggleFileView(false)
        this.isEditingMode = false
      }
    }
  }

  /**
   * Shows or hides file view.
   * @param {Boolean} show
   */
  toggleFileView (flag) {
    const fileView = this.elements.fileView
    const divider = this.elements.fileViewDivider

    if (flag) {
      fileView.style.display = 'block'

      setTimeout(function () {
        fileView.classList.add('toggled')
      }, 20)
    } else {
      fileView.classList.remove('toggled')

      setTimeout(function () {
        fileView.style.display = 'none'
      }, 200)
    }
  }

  /**
   * Shows or hides post demo.
   * @param {Boolean} show
   */
  togglePostView (flag) {
    const postView = this.elements.postView.getRoot()

    setTimeout(function () {
      postView.style.height = (flag) ? 'auto' : (postView.scrollHeight + 'px')
    }, (flag) ? 150 : 10)

    setTimeout(function () {
      postView.style.height = ((flag) ? postView.scrollHeight : 0) + 'px'
    }, (flag) ? 20 : 50)

    this.toggledPostView = flag
  }

  onUploadButtonClick = (e) => {
    this.elements.uploadInput.click()
  }

  onInputChange = (e) => {
    const self = this
    const file = e.target.files[0]

    this.setState({
      fileViewText: file.name
    })
    this.toggleFileView(true)

    let reader = new FileReader()

    reader.onload = function (e) {
      const src = e.target.result

      const postData = self.state.postData
      postData.media = src

      self.setState({
        postData
      })
    }

    reader.readAsDataURL(file)
  }

  /**
   * On action icon mouse down.
   * Makes ripple.
   * @param {Event}
   */
  onActionIconMouseDown = (e) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(e.target, this.props.actionIconRippleStyle, createRippleCenter(e.target, 14))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On action icon touch start. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onActionIconTouchStart = (e) => {
    const ripple = Ripple.createRipple(e.target, this.props.actionIconRippleStyle, createRippleCenter(e.target, 14, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  /**
   * On action icon click.
   * Hides file view.
   * @param {Event}
   */
  onActionIconClick = (e) => {
    this.toggleFileView(false)

    const postData = this.state.postData
    postData.media = ''

    this.setState({
      postData
    })
  }

  onTextFieldInput = (e, textfield) => {
    const postData = this.state.postData
    const value = textfield.getValue()

    if (textfield.props.textarea) {
      postData.content = value
    } else {
      postData.title = value
    }

    if (textfield.error) textfield.toggleError(false)

    this.setState({
      postData
    })
  }

  onSwitch = (e) => {
    this.togglePostView(!this.toggledPostView)
  }

  async save () {
    const panel = window.panel

    if (this.verifyForm()) {
      const titleTextField = this.elements.titleTextField
      const contentTextField = this.elements.contentTextField

      const snackbar = (!this.isEditingMode) ? panel.elements.addPostSnackbar : panel.elements.savePostSnackbar
      const postsPage = panel.elements.postsPage

      const title = titleTextField.getValue()
      const content = contentTextField.getValue()
      const media = this.state.postData.media

      const postsFilterDialog = panel.elements.postsFilterDialog

      if (!this.isEditingMode) {
        const json = await addPost(title, content, media)

        console.log(json)

        const filterSettingsUserID = postsFilterDialog.getFilterSettings().userID
        if (json.success && (filterSettingsUserID === panel.state.userInfo._id || filterSettingsUserID === 'all')) {
          let post = {
            _id: json.data._id,
            author: panel.state.userInfo._id,
            authorInfo: {
              username: panel.state.userInfo.username
            },
            date: json.data.date,
            title: title,
            content: content,
            media: media,
            likes: [],
            comments: [],
            editable: true
          }

          postsPage.setState({
            posts: [
              post, ...postsPage.state.posts
            ],
            fileViewText: ''
          })
        } else if (!json.success) {
          alert('Error')
          return console.error(json)
        }
      } else {
        const json = await editPost(postsPage.selectedPost.props.data._id, title, content, media)

        if (json.success) {
          const posts = postsPage.state.posts
          const index = posts.indexOf(postsPage.selectedPost.props.data)

          if (index < 0) return console.error('Index is less than 0')

          posts[index].title = titleTextField.getValue()
          posts[index].content = contentTextField.getValue()
          if (json.data.media != null && json.data.media !== '') json.data.media = '../' + json.data.media
          posts[index].media = json.data.media

          postsPage.setState({
            posts,
            fileViewText: ''
          })
        } else {
          alert('Error')
          return console.error(json)
        }
      }

      titleTextField.setValue('')
      contentTextField.setValue('')

      snackbar.toggle(true)
      this.toggle(false)
      this.toggleFileView(false)
      this.elements.uploadInput.value = ''
    }
  }

  verifyForm () {
    const titleTextField = this.elements.titleTextField
    const contentTextField = this.elements.contentTextField

    let error = false

    if (titleTextField.getValue().length < 1) {
      titleTextField.toggleError(true)
      error = true
    }

    if (contentTextField.getValue().length < 1) {
      contentTextField.toggleError(true)
      error = true
    }

    return !error
  }

  render () {
    return (
      <div className='post-dialog' ref={(e) => this.elements.root = e}>
        <div className='post-dialog-container'>
          <TextField ref={(e) => this.elements.titleTextField = e} hint='Tytuł' helperText='*Wymagane' onInput={this.onTextFieldInput} />
          <TextField ref={(e) => this.elements.contentTextField = e} className='text-area' textarea={true} hint='Treść' placeholder='Można używać HTML oraz CSS' helperText='*Wymagane' onInput={this.onTextFieldInput} />
          <a href='https://www.w3schools.com/tags/' target='_blank'>
            Lista znaczników HTML
          </a>
          <MaterialButton className='upload-picture' text='Dodaj zdjęcie' onClick={this.onUploadButtonClick} />
          <div className='switch-label'>
            <div className='label'>
              Podgląd
            </div>
            <Switch onSwitch={this.onSwitch} />
          </div>
          <div className='file-view' ref={(e) => this.elements.fileView = e}>
            <div className='text'>
              {this.state.fileViewText}
            </div>
            <div className='divider'/>
            <div className='action-icon' ref={(e) => this.elements.fileViewActionIcon = e} onMouseDown={this.onActionIconMouseDown} onClick={this.onActionIconClick} />
          </div>
        </div>
        <div className='post-view' >
          <Post ref={(e) => this.elements.postView = e} data={this.state.postData} canToggleComments={false} ripple={false} canAddComments={false} />
        </div>
        <input className='upload-input' ref={(e) => this.elements.uploadInput = e} type='file' name='pic' accept='image/*' onChange={this.onInputChange} />
      </div>
    )
  }

  componentDidMount () {
    // Add touchstart event
    this.elements.fileViewActionIcon.addEventListener('touchstart', this.onActionIconTouchStart)
  }
}

PostDialog.defaultProps = {
  actionIconRippleStyle: {
    backgroundColor: '#000',
    opacity: 0.3
  }
}
