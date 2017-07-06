import Component from '../../../helpers/Component'
import Cookies from '../../../helpers/Cookies'

import Table from './components/Table'
import List from './components/List'

import MaterialButton from '../../../imports/materialdesign/components/MaterialButton'
import Preloader from '../../../imports/materialdesign/components/Preloader'

export default class PostsPage extends Component {
  beforeRender () {
    this.tableLoaded = false
    this.listLoaded = false

    this.isTable = true

    this.checkBoxes = false
    this.checkedCheckBoxes = 0

    this.clickedPost = null

    this.toggledPictures = false

    this.selectedPosts = []

    this.loadedPage = 0

    this.postsData = [
      {
        id: 11,
        title: 'Post with style',
        author: 'Mikołaj Palkiewicz',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in neque turpis. Aenean tincidunt nunc nec ligula cursus iaculis. Pellentesque nisl nulla, malesuada a est a, tempor dapibus eros. Sed facilisis porta',
        date: '15.06.2017 13:02',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: [
          {
            author: 'Mikołaj Palkiewicz',
            userID: 1,
            content: 'Warto wiedzieć',
            date: '31.05.2017 18:14',
            avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
          }
        ],
        style: {
          background: '#2196F3',
          light: true,
          ripple: true
        }
      },
      {
        id: 10,
        title: 'Test',
        author: 'Mikołaj Palkiewicz',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in neque turpis. Aenean tincidunt nunc nec ligula cursus iaculis. Pellentesque nisl nulla, malesuada a est a, tempor dapibus eros. Sed facilisis porta auctor.',
        date: '14.04.2017 20:38',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [
          {
            userName: 'Mikołaj Palkiewicz',
            userID: 1
          },
          {
            userName: 'Eryk Rakowsky',
            userID: 15
          }
        ],
        comments: [
          {
            author: 'Mikołaj Palkiewicz',
            userID: 1,
            content: 'Lorem ipsum dolor sit amet',
            date: '31.05.2017 18:14',
            avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
          }
        ]
      },
      {
        id: 9,
        media: 'http://img11.deviantart.net/a66d/i/2015/109/3/b/forest_wallpaper_16_9_by_iorgudesign-d8qa67w.jpg',
        title: 'Test',
        author: 'Mikołaj Palkiewicz',
        content: 'Card with picture test',
        date: '14.04.2017 10:38',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: []
      },
      {
        id: 8,
        media: 'https://images.alphacoders.com/120/120313.jpg',
        title: 'Rain',
        author: 'Mikołaj Palkiewicz',
        content: 'Rainy day',
        date: '14.04.2017 9:45',
        avatar: 'https://images.alphacoders.com/120/thumb-1920-120313.jpg',
        likes: [],
        comments: []
      },
      {
        id: 7,
        title: 'HTML TAGS TEST',
        author: 'Mikołaj Palkiewicz',
        content: '<div id="tag-test-margin"></div><div id="tag-test"></div><style>#tag-test-margin {height:128px;} #tag-test{width:48px;height:48px;background-color:#2196f3;border-radius:100%;animation-name:tag-test-animation;animation-duration:2s;animation-iteration-count:infinite;animation-timing-function:ease-in-out;position:absolute;top:0;left:0;right:0;margin:0 auto;}</style><style>@keyframes tag-test-animation {0% {border-radius:100%;width:48px; height:48px;background-color:#2196f3;}25% {border-radius:0%;width:152px;height:152px;background-color:#90CAF9;}100%{border-radius:100%;width:48px;height:48px;background-color:#2196f3;}}</style>',
        date: '14.04.2017 8:07',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: []
      },
      {
        id: 6,
        title: 'Test 2',
        author: 'Mikołaj Palkiewicz',
        content: '6',
        date: '14.04.2017 10:38',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: []
      },
      {
        id: 5,
        title: 'Test 2',
        author: 'Mikołaj Palkiewicz',
        content: '6',
        date: '14.04.2017 10:38',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: []
      }
    ]
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Loads posts.
   */
  load = () => {
    const self = this
    const app = window.app
    const tables = this.elements.tables

    app.loadedPages.posts = true

    setTimeout(function () {
      app.togglePreloader(false)
      app.isLoading = false

      let cookieTable = Cookies.getCookie('table')
      const windowWidth = window.innerWidth

      let table = true

      if (windowWidth < 1000 && cookieTable !== 'true' || windowWidth >= 1000 && cookieTable === 'false') {
        table = false
      }

      if (table) {
        self.switchToTable()
      } else {
        self.switchToList()
      }

      tables.style.opacity = '1'

      self.elements.loadButton.getRoot().innerHTML = 'ZAŁADUJ WIĘCEJ (3)'

      self.toggleLoadButtonContainer(true)
    }, 1000)
  }

  /**
   * On select this page event.
   */
  onSelect = () => {
    const app = window.app
    const toolbar = app.getToolbar()

    app.toggleFAB(true)

    toolbar.showItems()
  }

  /**
   * On deselect this page event.
   */
  onDeselect = () => {
    const app = window.app
    const toolbar = app.getToolbar()

    app.toggleFAB(false)

    toolbar.hideItems(false, false)
  }

  /**
   * Switch to table.
   */
  switchToTable = (hide) => {
    const app = window.app
    const toolbar = app.getToolbar()
    const viewIcon = toolbar.getViewIcon()

    const table = this.elements.table
    const list = this.elements.list

    this.isTable = true
    viewIcon.classList.remove('table')

    list.getRoot().style.display = 'none'
    table.getRoot().style.display = 'block'

    if (!this.tableLoaded) {
      this.tableLoaded = true

      table.setCells(this.postsData)
    }

    Cookies.setCookie('table', 'true', 365)

    this.resetCheckboxes()

    this.isTable = true

    if (list.toggledPictures && !table.toggledPictures) {
      table.togglePictures(true)
    } else if (!list.toggledPictures && table.toggledPictures) {
      table.togglePictures(false)
    }
  }

  /**
   * Switch to list.
   */
  switchToList = () => {
    const app = window.app
    const toolbar = app.getToolbar()
    const viewIcon = toolbar.getViewIcon()

    const table = this.elements.table
    const list = this.elements.list

    this.isTable = false
    viewIcon.classList.add('table')

    table.getRoot().style.display = 'none'
    list.getRoot().style.display = 'block'

    if (!this.listLoaded) {
      this.listLoaded = true

      list.setCells(this.postsData)
    }

    this.resetCheckboxes()

    Cookies.setCookie('table', 'false', 365)

    if (table.toggledPictures && !list.toggledPictures) {
      list.togglePictures(true)
    } else if (!table.toggledPictures && list.toggledPictures) {
      list.togglePictures(false)
    }
  }

  /**
   * On menu delete posts button click event.
   * @param {Event}
   */
  onMenuItemDeletePostsClick = (e) => {
    this.toggleCheckBoxes(true)
  }

  onMenuItemEditPostClick = (e) => {
    const app = window.app
    const dialog = app.elements.postDialog

    dialog.toggle(true, true, this.clickedPost.props.data)
  }

  /**
   * Shows or hides checkboxes.
   * @param {Boolean}
   */
  toggleCheckBoxes (flag) {
    const app = window.app
    const toolbar = app.getToolbar()
    const deleteButton = toolbar.elements.deleteButton
    const deleteButtonRoot = deleteButton.getRoot()
    const multiIcon = toolbar.getMultiIcon()

    if (flag) {
      const navigationDrawer = app.getNavigationDrawer()

      if (navigationDrawer.toggled) navigationDrawer.hide()

      toolbar.hideItems(false, false)

      setTimeout(function () {
        deleteButtonRoot.style.display = 'block'

        setTimeout(function () {
          deleteButtonRoot.style.opacity = '1'
        }, 20)
      }, 100)

      multiIcon.changeToExit()
    } else {
      deleteButtonRoot.style.opacity = '0'

      setTimeout(function () {
        deleteButtonRoot.style.display = 'none'

        toolbar.showItems()
      }, 150)

      multiIcon.changeToDefault()
    }

    const toolbarTitle = (flag) ? 'Usuń zaznaczone posty (' + this.checkedCheckBoxes + ')' : app.defaultTitle

    toolbar.setTitle(toolbarTitle)

    const table = (this.isTable) ? this.elements.table : this.elements.list

    table.toggleCheckBoxes(flag)

    this.checkBoxes = flag
  }

  /**
   * On checkbox check event.
   * @param {Boolean} checked or unchecked
   * @param {Checkbox}
   */
  onCheck = (flag, element) => {
    const app = window.app
    const toolbar = app.getToolbar()

    if (this.checkBoxes) {
      if (flag) {
        this.checkedCheckBoxes++
      } else {
        this.checkedCheckBoxes--
      }

      toolbar.setTitle('Usuń zaznaczone posty (' + this.checkedCheckBoxes + ')')
    }
  }

  /**
   * Resets checkboxes.
   */
  resetCheckboxes = () => {
    const table = this.elements.table
    const list = this.elements.list

    const element = (!this.isTable) ? table : list

    for (var i = 0; i < element.cells.length; i++) {
      const cell = element.cells[i]
      const checkbox = cell.elements.checkbox

      if (checkbox.checked) {
        checkbox.unCheck()
      }
    }

    this.checkedCheckBoxes = 0
  }

  /**
   * Gets selected posts.
   * @return {Object} selected posts
   */
  getSelectedPosts = () => {
    const table = this.elements.table
    const list = this.elements.list

    let posts = []

    const element = (this.isTable) ? table : list

    for (var i = 0; i < element.cells.length; i++) {
      const cell = element.cells[i]
      const checkbox = cell.elements.checkbox

      if (checkbox.checked) {
        if (!this.isTable) {
          posts.push(cell.props.getItem())
        } else {
          posts.push(cell)
        }
      }
    }

    return posts
  }

  /**
   * On toolbar button delete posts click event.
   * Shows confirm dialog.
   * @param {Event}
   */
  onDeletePostsButtonClick = (e) => {
    const app = window.app
    const selectedPosts = this.getSelectedPosts()
    const dialog = app.elements.deletePostsDialog

    if (selectedPosts.length >= 1) {
      dialog.toggle(true)
    }
  }

  /**
   * On delete posts dialog confirm click event.
   */
  onDeletePostsDialogConfirmClick = (e) => {
    const app = window.app
    const dialog = app.elements.deletePostsDialog
    const snackbar = app.elements.deletedPostsSnackbar
    const snackbarRoot = snackbar.getRoot()

    this.toggleCheckBoxes(false)

    dialog.toggle(false)
    snackbar.toggle(true)

    app.moveFAB(snackbarRoot.scrollHeight)

    const selectedPosts = this.getSelectedPosts()

    for (var i = 0; i < selectedPosts.length; i++) {
      this.deletePost(selectedPosts[i].props.data, selectedPosts[i])
    }
  }

  /**
   * On delete post dialog confirm click event.
   * TODO
   */
  onDeletePostDialogConfirmClick = (e) => {
    const app = window.app
    const dialog = app.elements.deletePostDialog
    const snackbar = app.elements.deletedPostSnackbar
    const snackbarRoot = snackbar.getRoot()

    this.toggleCheckBoxes(false)

    dialog.toggle(false)
    snackbar.toggle(true)

    app.moveFAB(snackbarRoot.scrollHeight)

    this.deletePost(this.clickedPost.props.data, this.clickedPost)
  }

  deletePost = (data, element) => {
    let cell = element
    const index = this.postsData.indexOf(data)

    cell.getRoot().style.display = 'none'

    if (!this.isTable && this.tableLoaded) {
      const cellInTable = this.elements.table.cells[index]

      cellInTable.getRoot().style.display = 'none'
    } else if (this.isTable && this.listLoaded) {
      const itemInList = this.elements.list.items[index]

      itemInList.getRoot().style.display = 'none'
    }

    this.postsData[index].deleted = true
  }

  /**
   * On toolbar show pictures icon click event.
   * Shows or hides pictures in table or list.
   * @param {Event}
   */
  onShowPicturesClick = (e) => {
    const app = window.app
    const toolbar = app.getToolbar()
    const showPicturesIcon = toolbar.elements.showPicturesIcon
    const tooltip = app.elements.tooltipShowPictures

    const table = this.elements.table
    const list = this.elements.list

    tooltip.toggle(false)

    if (!this.toggledPictures) {
      showPicturesIcon.classList.add('hide')
    } else {
      showPicturesIcon.classList.remove('hide')
    }

    const element = (this.isTable) ? table : list

    element.togglePictures(!this.toggledPictures)
  }

  /**
   * Shows or hides load button container.
   * @param {Boolean}
   */
  toggleLoadButtonContainer = (flag) => {
    this.elements.loadButtonContainer.style.display = (flag) ? 'block' : 'none'
  }

  /**
   * Shows or hides preloader.
   * @param {Boolean}
   */
  toggleLoadPreloader = (flag) => {
    this.elements.loadPreloader.getRoot().style.display = (flag) ? 'block' : 'none'
  }

  /**
   * On load button click event.
   * @param {Event}
   */
  onLoadButtonClick = (e) => {
    this.loadPosts()
  }

  /**
   * Loads more posts.
   * TODO
   */
  loadPosts () {
    const self = this
    const app = window.app

    const table = this.elements.table
    const list = this.elements.list

    app.isLoading = true
    this.toggleLoadButtonContainer(false)
    this.toggleLoadPreloader(true)

    setTimeout(function () {
      const posts = [
        {
          id: 10,
          title: 'Load test',
          author: 'Mikołaj Palkiewicz',
          content: '<h1>1</h1>',
          date: '14.04.2017 10:38',
          avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
          likes: [],
          comments: []
        },
        {
          id: 10,
          title: 'Load test',
          author: 'Mikołaj Palkiewicz',
          content: '<h1>2</h1>',
          date: '14.04.2017 10:38',
          avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
          likes: [],
          comments: []
        },
        {
          id: 10,
          title: 'Load test',
          author: 'Mikołaj Palkiewicz',
          content: '<h1>3</h1>',
          date: '14.04.2017 10:38',
          avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
          likes: [],
          comments: []
        }
      ]

      for (var i = 0; i < posts.length; i++) {
        const post = posts[i]

        self.postsData.push(post)

        if (self.tableLoaded) {
          table.addPost(post)
        }

        if (self.listLoaded) {
          list.addPost(post)
        }
      }

      self.toggleLoadButtonContainer((self.loadedPage < 1))
      self.toggleLoadPreloader(false)

      app.isLoading = false

      self.loadedPage++
    }, 500)
  }

  render () {
    return (
      <div className='page page-posts' ref='root'>
        <div className='page-posts-tables' ref='tables'>
          <Table ref='table' />
          <List ref='list' />
        </div>
        <div className='page-posts-load' ref='loadButtonContainer'>
          <MaterialButton ref='loadButton' text='ZAŁADUJ WIĘCEJ (0)' onClick={this.onLoadButtonClick} />
        </div>
        <Preloader className='page-posts-preloader' ref='loadPreloader' />
      </div>
    )
  }
}
