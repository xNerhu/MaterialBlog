import Component from 'inferno-component'

import CookiesManager from '../../../../utils/CookiesManager'
import { getPosts, deletePost } from '../../../../actions/posts'

import List from './components/List'
import Table from './components/Table'

import PostDialog from './components/PostDialog'

export default class Posts extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      posts: [],
      table: null,
      pictures: false
    }

    this.toggledTable = true
    this.toggledPictures = false
    this.toggledDeletingMode = false

    this.checked = 0

    this.selectedPost = null
  }

  /**
   * Loads posts.
   */
  async load () {
    const panel = window.panel
    // Get posts
    const json = await getPosts('all', panel.state.userInfo._id)
    if (json.success === false) return console.error(json)

    // Add dots to all not empty pictures for correct image path
    for (var i = 0; i < json.length; i++) {
      if (json[i].media != null && json[i].media !== '') json[i].media = '../' + json[i].media
    }

    this.setState({
      posts: json
    })

    const listCookie = CookiesManager.get('list')
    let changeToTable = (window.innerWidth >= 1020)
    if (listCookie != null) changeToTable = !(listCookie === 'true')

    this.toggleTable(changeToTable, false)
    this.elements.root.style.opacity = '1'

    panel.togglePreloader(false)
    panel.toggleFAB(true)
  }

  /**
   * Shows table or list.
   * @param {Boolean} show table
   */
  toggleTable (flag, updateCookies = true) {
    const toolbarViewIconRoot = window.panel.elements.toolbarViewIcon.getRoot()

    this.setState({
      table: flag
    })

    if (flag) toolbarViewIconRoot.classList.remove('table')
    else toolbarViewIconRoot.classList.add('table')

    if (updateCookies) CookiesManager.set('list', !flag, 365)

    this.toggledTable = flag
  }

  /**
   * Shows or hides pictures in table or list.
   * @param {Boolean} show
   */
  togglePictures (flag) {
    const toolbarShowPicturesIconRoot = window.panel.elements.toolbarShowPicturesIcon.getRoot()

    this.setState({
      pictures: flag
    })

    if (flag) toolbarShowPicturesIconRoot.classList.add('hide')
    else toolbarShowPicturesIconRoot.classList.remove('hide')

    this.toggledPictures = flag
  }

  toggleDeletingMode (flag) {
    const panel = window.panel
    const toolbar = panel.elements.toolbar
    const multiIcon = toolbar.elements.multiIcon

    const element = (this.toggledTable) ? this.elements.table : this.elements.list

    element.setState({
      checkBoxes: flag
    })

    if (flag) multiIcon.changeToExit()
    else multiIcon.changeToDefault()

    toolbar.toggleItemsAndButton(flag, panel.postsPageToolbarItems, panel.elements.toolbarDeleteButton)

    panel.setState({
      toolbarTitle: (flag) ? 'Zaznaczone posty (0)' : panel.defaultToolbarTitle
    })

    this.toggledDeletingMode = flag
  }

  /**
   * On check.
   * Updates toolbar title.
   * @param {Boolean} checked
   * @param {CheckBox}
   */
  onCheckBox (flag, checkbox) {
    const toolbar = window.panel.elements.toolbar

    if (flag) this.checked++
    else this.checked--

    if (this.toggledDeletingMode) toolbar.setTitle('Zaznaczone posty (' + this.checked + ')')
  }

  /**
   * Gets selected posts.
   * @return {Object}
   */
  getSelectedPosts () {
    let posts = []

    const element = (this.toggledTable) ? this.elements.table : this.elements.list

    for (var i = 0; i < element.items.length; i++) {
      const item = element.items[i]

      // If item is not deleted
      if (!item.props.data.deleted) {
        const checkbox = item.elements.checkbox

        if (checkbox != null) {
          // If checkbox is checked
          if (checkbox.checked && !checkbox.props.disabled) {
            posts.push(item)
          }
        }
      }
    }

    return posts
  }

  /**
   * Shows delete selected posts confirm dialog.
   */
  deleteSelectedPosts () {
    if (this.checked > 0) {
      window.panel.elements.deletePostsDialog.elements.dialog.toggle(true)
    }
  }

  /**
   * Deletes post.
   * @param {Int} post index
   * @param {Function} callback
   */
  async deletePost (index, callback) {
    let posts = this.state.posts.slice()

    // Request delete post
    const json = await deletePost(posts[index]._id)
    if (!json.success) {
      callback(true)
      return console.error(json)
    }

    posts[index].deleted = true

    this.setState({
      posts
    })

    callback(false)
  }

  render () {
    let className = 'panel-page posts'
    if (this.state.table != null) className += ` ${this.state.table ? 'table' : 'list'}`
    if (this.state.pictures) className += ' pictures'

    return (
      <div className={className} ref={(e) => this.elements.root = e}>
        <List ref={(e) => this.elements.list = e} posts={this.state.posts} />
        <Table ref={(e) => this.elements.table = e} posts={this.state.posts} />
        <PostDialog ref={(e) => this.elements.postDialog = e} />
      </div>
    )
  }

  componentDidMount () {
    const panel = window.panel
    const title = 'Posty'

    panel.defaultToolbarTitle = title
    panel.setState({
      toolbarTitle: title
    })

    panel.elements.postsPage = this
  }
}
