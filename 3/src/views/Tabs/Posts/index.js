import React from 'react'

import Post from './components/Post'

import MaterialButton from '../../../imports/materialdesign/components/MaterialButton'
import Preloader from '../../../imports/materialdesign/components/Preloader'

export default class PostsTab extends React.Component {
  constructor () {
    super()

    this.state = {
      posts: [],
      toggledPreloader: false
    }

    this.postsObjects = []

    this.isFullScreen = false

    this.focusedPost = null

    this.loadPostsButton = null

    this.page = 1
    this.postsPerPage = 5
  }

  componentDidMount () {
    this.refs.root.addEventListener('scroll', this.onScroll)

    this.loadPostsButton = this.refs.loadPostsButton.refs.button
    this.loadPostsButton.style.display = 'none'
  }

  /**
   * Gets root.
   * @param {DomElement}
   */
  getRoot = () => {
    return this.refs.root
  }

  /**
   * Loads posts.
   */
  loadPosts = () => {
    const self = this
    const app = this.props.getApp()

    app.togglePreloader(true)

    app.selected.posts = true

    setTimeout(function () {
      app.canSelectTab = false
    }, 50)

    // TODO: make request
    setTimeout(function () {
      app.togglePreloader(false)

      app.canSelectTab = true

      setTimeout(function () {
        self.setState({
          posts: [
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
                  date: '14.04.2017 18:49',
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
        })

        self.loadPostsButton.style.display = 'block'
      }, 1)
    }, 1000)
  }

  /**
   * Checks that logged user likes the post
   * @param {Object} post likes data.
   * @return {Boolean}
   */
  isLikes = (data) => {
    const app = this.props.getApp()

    if (app.accountInfo) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].userID === app.accountInfo.userID) {
          return true
        }
      }
    }
    return false
  }

  /**
   * Get posts tab.
   * @return {PostsTab}
   */
  getPostsTab = () => {
    return this
  }

  /**
   * Shows full screen post.
   * @param {DOMElement} post object.
   * @param {Object} post data.
   */
  enterFullScreen = (post, data) => {
    const self = this
    const app = this.props.getApp()
    const toolbar = app.getToolBar()
    const posts = this.postsObjects
    const searchIcon = toolbar.refs.searchIcon

    searchIcon.hide(true)

    this.focusedPost = post

    if (this.isFullScreen === false && !this.state.toggledPreloader) {
      this.isFullScreen = null
      for (var p = 0; p < posts.length; p++) {
        const main = posts[p]
        const object = main.refs.post

        if (object !== post) {
          object.style.height = object.scrollHeight + 'px'

          setTimeout(function () {
            object.style.height = '0px'

            setTimeout(function () {
              post.style.maxWidth = '100%'
              post.style.marginTop = '0px'
            }, 100)
            setTimeout(function () {
              object.style.display = 'none'
              self.isFullScreen = true
            }, 250)
          }, 10)
        } else {
          main.refs.content.style.userSelect = 'auto'
          main.ripple = false
        }
      }

      this.loadPostsButton.style.display = 'none'

      toolbar.refs.menuIcon.changeToArrow()

      app.setToolBarTitle(data.title)

      app.hideTabLayout()
    }
  }

  /**
   * Hides full screen post.
   */
  exitFullScreen = () => {
    const self = this
    const app = this.props.getApp()
    var toolbar = app.getToolBar()
    const posts = this.postsObjects
    const post = this.focusedPost
    const searchIcon = toolbar.refs.searchIcon

    searchIcon.show()

    if (this.isFullScreen === true) {
      this.isFullScreen = null

      post.style.maxWidth = '550px'
      setTimeout(function () {
        for (var p = 0; p < posts.length; p++) {
          const main = posts[p]
          const object = main.refs.post

          if (object !== post) {
            object.style.display = 'block'
            setTimeout(function () {
              object.style.height = object.scrollHeight + 'px'
              post.style.marginTop = '32px'

              self.isFullScreen = false
              setTimeout(function () {
                object.style.height = 'auto'
                self.focusedPost.scrollIntoView({
                  block: 'end',
                  behavior: 'smooth'
                })
                self.loadPostsButton.style.display = 'block'
              }, 200)
            }, 10)
          } else {
            main.ripple = true
            main.refs.content.style.userSelect = 'none'
          }
        }
      }, 100)

      toolbar.refs.menuIcon.changeToDefault()

      app.setToolBarTitle(app.props.toolbarTitle)

      app.showTabLayout()
    }
  }

  /**
   * On posts tab scroll event (infinity scroll).
   */
  onScroll = () => {
    if (isVisible(this.loadPostsButton)) this.loadMorePosts()
  }

  /**
   * On load posts button click event.
   */
  onLoadsPostsButtonClick = () => {
    this.loadMorePosts()
  }

  /**
   * Loads more posts.
   */
  loadMorePosts = () => {
    const self = this

    this.loadPostsButton.style.display = 'none'

    this.setState({
      toggledPreloader: true
    })

    // TODO: Make request
    const posts = this.state.posts
    const newPosts = [
      {
        id: this.page + 2,
        title: 'aha.png',
        author: 'Mikołaj Palkiewicz',
        content: this.page + 1,
        date: '32.14.-1600 25:70',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: []
      },
      {
        id: this.page + 3,
        title: 'warto_wiedzieć.exe',
        author: 'Mikołaj Palkiewicz',
        content: this.page + 1,
        date: '64.32.16 8:4',
        avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
        likes: [],
        comments: []
      }
    ]

    this.page++

    setTimeout(function () {
      for (var i = 0; i < newPosts.length; i++) {
        posts.push(newPosts[i])
      }

      self.loadPostsButton.style.display = 'block'

      self.setState({
        toggledPreloader: false
      })
    }, 1000)
  }

  render () {
    // Styles.
    const preloaderStyle = {
      display: (!this.state.toggledPreloader) ? 'none' : 'block'
    }

    var index = -1

    return (
      <div className='posts-tab tab-page' ref='root'>
        <div className='posts'>
          {
            this.state.posts.map((data, i) => {
              index++
              return <Post key={i} data={data} index={index} getApp={this.props.getApp} isLikes={this.isLikes} getPostsTab={this.getPostsTab} enterFullScreen={this.enterFullScreen}>{data.content}</Post>
            })
          }
        </div>
        <MaterialButton ref='loadPostsButton' className='load-posts-button' onClick={this.onLoadsPostsButtonClick}>
          ZAŁADUJ WIĘCEJ
        </MaterialButton>
        <Preloader ref='preloader' className='load-posts-preloader' style={preloaderStyle} strokeColor='#2196f3' strokeWidth={4} />
      </div>
    )
  }
}
