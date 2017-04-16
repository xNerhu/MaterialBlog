import React from 'react'
import {Motion} from 'react-motion'

import Post from './components/Post'
//import Preloader from '../../../imports/materialdesign/components/Preloader'

export default class PostsTab extends React.Component {
  constructor () {
    super()

    this.state = {
      left: 0,
      display: 'none',
      defaultLeft: 0,
      posts: []
    }

    this.isVisible = false

    this.root = null

    this.clickedPost = null
  }

  componentDidMount () {
    this.setState({
      posts: [
        {
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
  }

  getRoot = () => {
    return this.root
  }

  /**
    * on post click event
    * @param {Object} event data
    * @param {int} post index
    */
  onPostClick = (data, element) => {
    //var bounds = this.props.getApp().getToolBar().getBoundingClientRect()
    this.props.getApp().getToolBar().setState({height: 64})
    this.props.getApp().setState({tabLayoutHidden: true})
    element.viewFullScreen()
    this.props.getApp().getToolBar().refs.menuIcon.changeToArrow()

    this.clickedPost = element
  }

  getPostsTab = () => {
    return this
  }

  render () {
    var self = this
    function onRest () {
      if (!self.isVisible) {
        self.setState({display: 'none'})
      }
    }
    var index = 0
    return (
      <Motion onRest={onRest} style={{left: this.state.left}}>
        {value =>
          <div className='posts-tab tab-page' ref={(t) => { this.root = t }} style={{left: value.left, display: this.state.display}}>
            <div className='posts'>
              {
                this.state.posts.map((data, i) => {
                  index++
                  return <Post key={i} index={index - 1} title={data.title} author={data.author} date={data.date} likes={data.likes} comments={data.comments} getApp={this.props.getApp} getPostsTab={this.getPostsTab} avatar={data.avatar} onClick={this.onPostClick}>{data.content}</Post>
                })
            }
            </div>
          </div>}
      </Motion>
    )
  }
}
