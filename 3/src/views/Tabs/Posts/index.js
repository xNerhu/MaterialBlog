import React from 'react'
import {Motion} from 'react-motion'

import Post from './components/Post'

export default class PostsTab extends React.Component {
  constructor () {
    super()

    this.state = {
      left: 0,
      display: 'none',
      defaultLeft: 0,
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
          title: 'Test 2',
          author: 'Mikołaj Palkiewicz',
          content: 'wrwrr',
          date: '14.04.2017 10:38',
          avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
          likes: [],
          comments: []
        },
        {
          id: 8,
          title: 'Test 2',
          author: 'Mikołaj Palkiewicz',
          content: '8',
          date: '14.04.2017 10:38',
          avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
          likes: [],
          comments: []
        },
        {
          id: 7,
          title: 'Test 2',
          author: 'Mikołaj Palkiewicz',
          content: '7',
          date: '14.04.2017 10:38',
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
        }
      ]
    }

    this.isVisible = false
    this.root = null
    this.postsObjects = []
    this.isFullScreen = false
    this.focusedPost = null
  }

  /**
   * Gets root.
   * @param {DomElement}
   */
  getRoot = () => {
    return this.root
  }

  /**
   * Loads posts
   */
  loadPosts = () => {
    /*var self = this

    this.props.getApp().setState({
      dataPreloaderVisible: true
    })
    this.props.getApp().selected.posts = true
    setTimeout(function () {
      self.props.getApp().canSelectTab = false
    }, 50)
    //this.setState({postsDisplay: 'none', postsOpacity: 0})

    // TODO: make request
    setTimeout(function () {
      //self.props.getApp().setState({dataPreloaderVisible: false})
      //self.setState({postsDisplay: 'block'})
      self.props.getApp().setState({
        dataPreloaderVisible: false
      })
      self.props.getApp().canSelectTab = true
      this.canSelectTab = false
      setTimeout(function () {
        self.setState({
          postsOpacity: 1,
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
              title: 'Test 2',
              author: 'Mikołaj Palkiewicz',
              content: '9',
              date: '14.04.2017 10:38',
              avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
              likes: [],
              comments: []
            },
            {
              id: 8,
              title: 'Test 2',
              author: 'Mikołaj Palkiewicz',
              content: '8',
              date: '14.04.2017 10:38',
              avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
              likes: [],
              comments: []
            },
            {
              id: 7,
              title: 'Test 2',
              author: 'Mikołaj Palkiewicz',
              content: '7',
              date: '14.04.2017 10:38',
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
            }
          ]
        })
      }, 1)
    }, 1000)*/
  }

  /**
   * Chechs that logged user likes the post
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
    var toolbar = app.getToolBar()
    const posts = this.postsObjects

    if (this.isFullScreen === false) {
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
          this.focusedPost = post
        }
      }

      toolbar.refs.menuIcon.changeToArrow()

      var toolBarItems = app.state.toolbarItems
      var toolBarTitleIndex = 0

      // Get title index.
      for (var i = 0; i < toolBarItems.length; i++) {
        if (toolBarItems[i].type === 'Title') {
          toolBarTitleIndex = i
          break
        }
      }

      // Change title.
      toolBarItems[toolBarTitleIndex].title = data.title
      app.setState({
        toolbarItems: toolBarItems
      })

      // Hide tabbar.
      toolbar.setState({
        height: 64
      })
      app.setState({
        tabLayoutHidden: true
      })
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

              setTimeout(function () {
                object.style.height = 'auto'
                self.isFullScreen = false
              }, 250)
            }, 10)
          }
        }
      }, 100)
    }
  }

  render () {
    var self = this
    function onRest () {
      if (!self.isVisible) {
        self.setState({display: 'none'})
      }
    }

    // Styles.
    var index = -1
    return (
      <Motion onRest={onRest} style={{left: this.state.left}}>
        {value =>
          <div className='posts-tab tab-page' ref={(t) => { this.root = t }} style={{left: value.left, display: this.state.display}}>
            <div className='posts'>
              {
                this.state.posts.map((data, i) => {
                  index++
                  return <Post key={i} data={data} index={index} getApp={this.props.getApp} isLikes={this.isLikes} getPostsTab={this.getPostsTab} enterFullScreen={this.enterFullScreen}>{data.content}</Post>
                })
              }
            </div>
        </div>}
      </Motion>
    )
  }
}
