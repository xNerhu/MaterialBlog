import Component from '../../../helpers/Component'
import UI from '../../../helpers/UI'
import Colors from '../../../helpers/Colors'

import Post from './components/Post'

import FAB from '../../../imports/materialdesign/components/FAB'
import MaterialButton from '../../../imports/materialdesign/components/MaterialButton'
import Preloader from '../../../imports/materialdesign/components/Preloader'

export default class PostsTab extends Component {
  beforeRender () {
    this.postsData = []
    this.posts = []

    this.fullScreen = {
      flag: false,
      post: null
    }

    this.toggledFAB = false
    this.fab = false
    this.fabTimer = null

    this.loadingMorePosts = false
    this.page = 0
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Gets posts tab.
   * @return {PostsTAB}
   */
  getPostsTab = () => {
    return this
  }

  /**
   * Gets floating action button.
   * @return {FAB}
   */
  getFAB = () => {
    return this.elements.fab
  }

  /**
   * loads posts.
   */
  load = () => {
    const self = this
    const app = window.app
    const root = this.getRoot()
    const posts = this.elements.posts
    const loadPostsButtonContainer = this.elements.loadPostsButtonContainer

    app.tabsLoaded.posts = true

    // TODO: Make request
    setTimeout(function () {
      app.togglePreloader(false)
      app.isLoading = false

      self.postsData = [
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

      for (let i = 0; i < self.postsData.length; i++) {
        const post = (
          <Post data={self.postsData[i]} getPostsTab={self.getPostsTab} index={i} />
        )

        self.renderComponents(post, posts)
      }

      loadPostsButtonContainer.style.display = 'block'

      app.callElements()
    }, 1000)
  }

  /**
   * On select this tab event.
   * Shows fab if fab was hidden.
   */
  onSelect = () => {
    if (this.fab) {
      this.toggleFAB(true)

      this.fab = false
    }
  }

  /**
   * On deselect this tab event.
   * Hides fab.
   */
  onDeselect = () => {
    if (this.toggledFAB) {
      this.toggleFAB(false)

      this.fab = true
    } else {
      this.fab = false
    }
  }

  /**
   * Enter or exit full screen post.
   * @param {Boolean} full screen.
   * @param {Post} post.
   */
  toggleFullScreen = (flag, post) => {
    const app = window.app
    const toolbar = app.elements.toolbar
    const multiIcon = toolbar.getMultiIcon()
    const searchIcon = toolbar.getSearchIcon()
    const posts = this.posts
    const loadPostsButtonContainer = this.elements.loadPostsButtonContainer

    if (!this.loadingMorePosts) {
      if (!searchIcon.fullWidth) {
        toolbar.toggleTabs(!flag)
        this.fullScreen.flag = flag
      }

      if (flag && !searchIcon.fullWidth) {
        const navigationDrawer = app.getNavigationDrawer()
        const root = post.getRoot()

        loadPostsButtonContainer.style.display = 'none'

        if (navigationDrawer.toggled) {
          navigationDrawer.hide()

          setTimeout(function () {
            multiIcon.changeToDefault()
            setTimeout(function () {
              multiIcon.changeToArrow()
            }, 250)
          }, 250)
        } else {
          multiIcon.changeToArrow()
        }
        multiIcon.blockClick()

        this.fullScreen.post = post
        post.props.ripple = false
        toolbar.hideItems(false, true, false)

        for (let i = 0; i < posts.length; i++) {
          const _post = posts[i]
          const _postRoot = _post.getRoot()

          if (_postRoot !== root) {
            _postRoot.style.height = _postRoot.scrollHeight + 'px'

            setTimeout(function () {
              root.style.maxWidth = '100%'
              root.style.marginTop = '0px'
            }, 50)

            setTimeout(function () {
              _postRoot.style.height = '0px'

              setTimeout(function () {
                _postRoot.style.display = 'none'
              }, 250)
            }, 10)
          }
        }
      } else if (!flag) {
        const post = this.fullScreen.post
        const root = post.getRoot()

        toolbar.showItems()

        post.props.ripple = true

        root.style.maxWidth = '550px'
        root.style.marginTop = '32px'

        setTimeout(function () {
          for (let i = 0; i < posts.length; i++) {
            const _post = posts[i]
            const _postRoot = _post.getRoot()

            if (_postRoot !== root) {
              _postRoot.style.display = 'block'

              setTimeout(function () {
                _postRoot.style.height = _postRoot.scrollHeight + 'px'

                setTimeout(function () {
                  _postRoot.style.height = 'auto'
                }, 250)
              }, 10)
            }
          }

          setTimeout(function () {
            root.scrollIntoView({
              block: 'end',
              behavior: 'smooth'
            })

            loadPostsButtonContainer.style.display = 'block'
          }, 250)
        }, 150)
      }
    }
  }

  /**
   * On posts tab scroll event.
   * Shows or hides flaoting action button.
   * Loads more posts.
   * @param {Event}
   */
  onScroll = (e) => {
    const root = this.getRoot()
    const loadPostsButtonContainer = this.elements.loadPostsButtonContainer

    if (UI.isVisible(loadPostsButtonContainer)) this.loadMorePosts()

    this.toggleFAB(root.scrollTop > window.innerHeight && !this.fullScreen.flag)
  }

  /**
   * Loads more posts.
   */
  loadMorePosts = () => {
    const self = this
    const app = window.app
    const container = this.elements.loadPostsButtonContainer
    const preloader = this.elements.loadPostsPreloader
    const preloaderRoot = preloader.getRoot()
    const posts = this.elements.posts

    if (this.page <= 10) {
      container.style.display = 'none'
      preloaderRoot.style.display = 'block'
      app.isLoading = true
      this.loadingMorePosts = true

      // TODO: Make request
      setTimeout(function () {
        app.isLoading = false

        const r = UI.getRandomInt(1, 255 - self.page)
        const g = UI.getRandomInt(1, 255 - self.page)
        const b = UI.getRandomInt(1, 255 - self.page)

        const img = Colors.getColoredImage(r, g, b)
        const color = Colors.rgbToHex(r, g, b)

        self.postsData = [
          {
            media: img,
            id: this.page + 10,
            title: self.page,
            author: 'Mikołaj Palkiewicz',
            content: '<span id="test-' + color.substr(1, color.length) + '">' + color + '</span><style>#test-' + color.substr(1, color.length) + ' {color: ' + color + ';}</style>',
            date: '14.04.2017 8:07',
            avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
            likes: [],
            comments: []
          }
        ]

        for (let i = 0; i < self.postsData.length; i++) {
          const post = (
            <Post data={self.postsData[i]} getPostsTab={self.getPostsTab} index={i} />
          )

          self.renderComponents(post, posts)
        }

        if (self.page < 10) {
          container.style.display = 'block'
          self.page++
        }

        preloaderRoot.style.display = 'none'

        self.loadingMorePosts = false
      }, 200)
    }
  }

  /**
   * Shows or hides floating action button.
   * @param {Boolean} show or hide.
   */
  toggleFAB = (flag) => {
    const fabContainer = this.elements.fabContainer
    const fab = this.getFAB().getRoot()

    if (flag && !this.toggledFAB) {
      if (this.fabTimer !== null) {
        clearTimeout(this.fabTimer)
      }

      fabContainer.style.display = 'block'

      setTimeout(function () {
        fab.style.height = '56px'
        fab.style.width = '56px'
      }, 10)
    } else if (!flag && this.toggledFAB) {
      fab.style.height = '0px'
      fab.style.width = '0px'

      this.fabTimer = setTimeout(function () {
        fabContainer.style.display = 'none'
      }, 300)
    }

    this.toggledFAB = flag
  }

  /**
   * On floating action button click event.
   * Scrolls to top.
   * @param {Event}
   */
  onFABClick = (e) => {
    this.posts[0].getRoot().scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    })
  }

  render () {
    return (
      <div className='posts-tab tab-page' ref='root'>
        <div className='posts' ref='posts' />
        <div className='posts-fab-container' ref='fabContainer'>
          <FAB className='posts-fab' ref='fab' onClick={this.onFABClick} />
        </div>
        <div className='load-posts-button-container' ref='loadPostsButtonContainer'>
          <MaterialButton className='load-posts-button' ref='loadPostsButton' text='ZAŁADUJ WIĘCEJ' />
        </div>
        <Preloader className='load-posts-preloader' ref='loadPostsPreloader' />
      </div>
    )
  }

  afterRender () {
    const root = this.getRoot()

    root.addEventListener('scroll', this.onScroll)
  }
}
