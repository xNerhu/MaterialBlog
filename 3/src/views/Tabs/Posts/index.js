import React from 'react'
import {Motion} from 'react-motion'

import Post from './components/Post'

//import Url from '../../../helpers/Url'
//import Preloader from '../../../imports/materialdesign/components/Preloader'

export default class PostsTab extends React.Component {
  constructor () {
    super()

    this.state = {
      left: 0,
      display: 'none',
      defaultLeft: 0,
      posts: [],
      isFullScreen: false,
      postsDisplay: 'none',
      postsOpacity: 0,
      fullScreenPostDisplay: 'none',
      fullScreenPostTop: 200,
      fullScreenPostOpacity: 0,
      fullScreenPost: {
        title: '',
        author: '',
        content: '',
        date: '',
        avatar: '',
        likes: [],
        comments: []
      }
    }

    this.isVisible = false

    this.root = null

    this.clickedPost = null
  }

  componentDidMount () {
    /*this.setState({
      posts: [
        {
          id: 2,
          title: 'Test',
          author: 'Mikołaj Palkiewicz',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in neque turpis. Aenean tincidunt nunc nec ligula cursus iaculis. Pellentesque nisl nulla, malesuada a est a, tempor dapibus eros. Sed facilisis porta auctor.',
          date: '14.04.2017 20:38',
          avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
          likes: [
            {
              userName: 'Mikołaj Palkiewicz',
              userID: 1
            }
          ],
          comments: [
            {
              author: 'Mikołaj Palkiewicz',
              userID: 1,
              content: 'Lorem ipsum dolor sit amet',
              date: '14.04.2017 21:12',
              avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
            }
          ]
        },
        {
          id: 1,
          title: 'Test 2',
          author: 'Mikołaj Palkiewicz',
          content: 'Wart.',
          date: '14.04.2017 10:38',
          avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
          likes: [],
          comments: []
        }
      ]
    })*/
    this.loadPosts()
  }

  getRoot = () => {
    return this.root
  }

  /**
    * on post click event
    * @param {Object} event data
    * @param {DomElement} post
    */
  onPostClick = (event, element) => {
    var postData = this.getPost(element.props.id)
    this.setState({fullScreenPost: postData})
    this.showFullScreenPost(element.index, element)
  }

  /**
    * enter full screen post
    * @param {int} post index
    * @param {DomElement} post
    */
  showFullScreenPost = (index, element) => {
    var self = this
    const navigationDrawer = this.props.getApp().refs.navigationDrawer

    this.props.getApp().getToolBar().setState({height: 64})
    this.props.getApp().setState({tabLayoutHidden: true})

    this.setState({isFullScreen: true, postsOpacity: 0})
    setTimeout(function () {
      self.setState({postsDisplay: 'none'})
    }, 300)
    this.setState({fullScreenPostDisplay: 'block'})
    setTimeout(function () {
      self.setState({fullScreenPostTop: 0, fullScreenPostOpacity: 1})
    }, 10)

    if (navigationDrawer.state.toggled) {
      navigationDrawer.hide()
      this.props.getApp().getToolBar().refs.menuIcon.changeToDefault()
      setTimeout(function () {
        self.props.getApp().getToolBar().refs.menuIcon.changeToArrow()
      }, 100)
    } else {
      self.props.getApp().getToolBar().refs.menuIcon.changeToArrow()
    }

    if (element !== undefined) {
      if (element.state.commentsVisible) {
        this.fullScreenPost.setState({commentsVisible: true})
      } else if (!element.state.commentsVisible && this.fullScreenPost.state.commentsVisible) {
        this.fullScreenPost.setState({commentsVisible: false})
      }
    }

    this.clickedPost = element
  }

  /**
    * exit full screen post
    */
  exitFullScreenPost = () => {
    var self = this

    this.props.getApp().getToolBar().setState({height: 129})
    this.props.getApp().setState({tabLayoutHidden: false})

    this.setState({fullScreenPostTop: 200, fullScreenPostOpacity: 0})
    setTimeout(function () {
      self.setState({fullScreenPostDisplay: 'none'})
    }, 300)

    this.setState({postsDisplay: 'block'})
    setTimeout(function () {
      self.setState({isFullScreen: false, postsOpacity: 1})
    }, 10)

    this.props.getApp().getToolBar().refs.menuIcon.changeToDefault()

    if (this.clickedPost !== undefined) {
      if (this.fullScreenPost.state.commentsVisible && !this.clickedPost.state.commentsVisible) {
        this.clickedPost.setState({commentsVisible: true})
      } else if (!this.fullScreenPost.state.commentsVisible && this.clickedPost.state.commentsVisible) {
        this.clickedPost.setState({commentsVisible: false})
      }
    }
  }

  /**
    * gets posts tab
    * @return {PostsTab}
    */
  getPostsTab = () => {
    return this
  }

  /**
    * gets post with id
    * @param {int} post id
    * @return {Object} post data
    */
  getPost = (id, postsData = this.state.posts) => {
    var post = false
    for (var i = 0; i < postsData.length; i++) {
      if (postsData[i].id === id) {
        post = postsData[i]
        break
      }
    }
    return post
  }

  loadPosts = () => {
    var self = this

    this.props.getApp().setState({dataPreloaderVisible: true})
    this.setState({postsDisplay: 'none', postsOpacity: 0})

    // TODO: get posts from database
    setTimeout(function () {
      self.props.getApp().setState({dataPreloaderVisible: false})
      self.setState({postsDisplay: 'block'})
      setTimeout(function () {
        self.setState({
          postsOpacity: 1,
          posts: [
            {
              id: 2,
              title: 'Test',
              author: 'Mikołaj Palkiewicz',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in neque turpis. Aenean tincidunt nunc nec ligula cursus iaculis. Pellentesque nisl nulla, malesuada a est a, tempor dapibus eros. Sed facilisis porta auctor.',
              date: '14.04.2017 20:38',
              avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
              likes: [
                {
                  userName: 'Mikołaj Palkiewicz',
                  userID: 1
                }
              ],
              comments: [
                {
                  author: 'Mikołaj Palkiewicz',
                  userID: 1,
                  content: 'Lorem ipsum dolor sit amet',
                  date: '14.04.2017 21:12',
                  avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
                }
              ]
            },
            {
              id: 1,
              title: 'Test 2',
              author: 'Mikołaj Palkiewicz',
              content: 'Wart.',
              date: '14.04.2017 10:38',
              avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
              likes: [],
              comments: []
            }
          ]
        })
      }, 1)
    }, 1000)
  }

  render () {
    var self = this
    function onRest () {
      if (!self.isVisible) {
        self.setState({display: 'none'})
      }
    }
    var index = 0

    const postsStyle = {
      opacity: this.state.postsOpacity,
      display: this.state.postsDisplay
    }

    const fullScreenPostStyle = {
      opacity: this.state.fullScreenPostOpacity,
      display: this.state.fullScreenPostDisplay,
      top: this.state.fullScreenPostTop
    }

    return (
      <Motion onRest={onRest} style={{left: this.state.left}}>
        {value =>
          <div className='posts-tab tab-page' ref={(t) => { this.root = t }} style={{left: value.left, display: this.state.display}}>
            <div className='posts' style={postsStyle}>
              {
                this.state.posts.map((data, i) => {
                  index++
                  return <Post key={i} index={index - 1} id={data.id} title={data.title} author={data.author} date={data.date} likes={data.likes} comments={data.comments} getApp={this.props.getApp} getPostsTab={this.getPostsTab} avatar={data.avatar} onClick={this.onPostClick}>{data.content}</Post>
                })
            }
            </div>
            <Post className='fullscreen-post' ref={(ref) => { this.fullScreenPost = ref }}
              style={fullScreenPostStyle}
              title={this.state.fullScreenPost.title}
              author={this.state.fullScreenPost.author}
              date={this.state.fullScreenPost.date}
              likes={this.state.fullScreenPost.likes}
              comments={this.state.fullScreenPost.comments}
              getApp={this.props.getApp}
              getPostsTab={this.state.fullScreenPost.getPostsTab}
              avatar={this.state.fullScreenPost.avatar}
              ripple={false}
              commentsRipple={false}
            >
              {this.state.fullScreenPost.content}
            </Post>
          </div>}
      </Motion>
    )
  }
}
