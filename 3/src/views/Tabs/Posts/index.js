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
      posts: []
    }

    this.isVisible = false

    this.root = null
  }

  componentDidMount () {
    this.setState({
      posts: [
        {
          title: 'Test',
          author: 'Mikołaj Palkiewicz',
          content: 'Lorem impsum warto wiedziec',
          date: '14.04.2017 20:38',
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
              content: 'Muu ale super',
              date: '14.04.2017 21:12'
            }
          ]
        }
      ]
    })
  }

  getRoot = () => {
    return this.root
  }

  render () {
    var self = this
    function onRest () {
      if (!self.isVisible) {
        self.setState({display: 'none'})
      }
    }

    return (
      <Motion onRest={onRest} style={{left: this.state.left}}>
        {value =>
          <div className='posts-tab tab-page' ref={(t) => { this.root = t }} style={{left: value.left, display: this.state.display}}>
            <div className='posts'>
              {this.state.posts.map((data, i) => {
                return <Post key={i} title={data.title} author={data.author} date={data.date} likes={data.likes} comments={data.comments} getApp={this.props.getApp}>{data.content}</Post>
              })}

            </div>
          </div>}
      </Motion>
    )
  }
}
