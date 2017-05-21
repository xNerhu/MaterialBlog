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
                  return <Post key={i} data={data} index={index} getApp={this.props.getApp} isLikes={this.isLikes}>{data.content}</Post>
                })
              }
            </div>
        </div>}
      </Motion>
    )
  }
}
