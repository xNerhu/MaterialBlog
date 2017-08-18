import Component from '../../../../../helpers/Component'

import Dialog from '../../../../../imports/materialdesign/components/Dialog'
import DropDown from '../../../../../imports/materialdesign/components/DropDown'

export default class PostsFilterDialog extends Component {
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
        text: 'OK',
        onClick: this.onOKButtonClick
      },
      {
        text: 'ANULUJ',
        onClick: function () {
          dialog.toggle(false)
        }
      }
    ]

    dialog.setItems(items)
  }

  /**
   * Shows dialog.
   */
  show () {
    this.elements.dialog.toggle(true)
  }

  onOKButtonClick = (e) => {
    const dialog = this.elements.dialog

    const app = window.app
    const postsPage = app.getPostsPage()

    postsPage.selectedPosts = []
    postsPage.loadedPage = 0

    postsPage.elements.loadButton.getRoot().innerHTML = 'ZAŁADUJ WIĘCEJ (3)'
    postsPage.toggleLoadButtonContainer(true)

    postsPage.postsData = [
      {
        id: 50,
        title: 'Test',
        author: 'Mikołaj Palkiewicz',
        content: 'x',
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
        ]
      }
    ]

    dialog.toggle(false)

    const postsContainer = postsPage.elements.tables
    const loadButtonContainer = postsPage.elements.loadButtonContainer

    loadButtonContainer.style.opacity = '0'
    postsContainer.style.opacity = '0'

    app.pagesData.loading = true
    app.togglePreloader(true)

    setTimeout(function () {
      postsPage.elements.table.setCells(postsPage.postsData)

      setTimeout(function () {
        app.pagesData.loading = false
        app.togglePreloader(false)

        postsContainer.style.opacity = '1'
        loadButtonContainer.style.opacity = '1'
      }, 150)
    }, 1000)
  }

  render () {
    return (
      <div className='filter-dialog' ref='root'>
        <Dialog title='false' ref='dialog'>
          <div className='filter-dialog-section'>
            <div className='title'>
              Użytkownik
            </div>
            <div className='control'>
              <DropDown ref={(e) => { this.user = e }} />
            </div>
          </div>
          <div className='filter-dialog-section'>
            <div className='title'>
              Data
            </div>
            <div className='control'>
              <DropDown ref={(e) => { this.date = e }} />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }

  afterRender () {
    this.setDialogItems()

    const userDropDown = this.user
    const dateDropDown = this.date

    // Set users
    userDropDown.setItems([
      'Wszyscy',
      'Mikołaj Palkiewicz',
      'Eryk Rakowski'
    ])
    userDropDown.selectItem(0)

    // Set dates
    dateDropDown.setItems([
      'Zawsze',
      '6 Miesięcy',
      '5 Miesięcy',
      '4 Miesiące',
      '3 Miesiące',
      '2 Miesiące',
      'Miesiąc'
    ])
    dateDropDown.selectItem(0)
  }
}
