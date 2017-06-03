import React from 'react'

import PostsTable from './components/PostsTable'
import PostsMobile from './components/PostsMobile'

import Checkbox from '../../../imports/materialdesign/components/Checkbox'

export default class Posts extends React.Component {
  constructor () {
    super()

    this.state = {
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
              date: '31.05.2017 18:14',
              avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
            }
          ]
        },
        {
          id: 10,
          title: 'Bąk',
          author: 'Mikołaj Palkiewicz',
          content: 'Taka pszczoła albo bączur',
          date: '14.04.2017 20:38',
          avatar: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281',
          likes: [],
          comments: []
        }
      ]
    }
  }

  render () {
    const cells = [
      {
        title: 'ID',
        text: '1'
      },
      {
        title: 'Autor',
        text: 'Mikołaj Pakiewicz'
      },
      {
        title: 'Data',
        text: '02.06.2017 21:45'
      },
      {
        title: 'Tytuł',
        text: 'Tyt<span style="font-weight:bold">uł</span>'
      },
      {
        title: 'Treść',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q<span style="color:red">te velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</span> deserunt mollit anim id est laborum.'
      }
    ]

    return (
      <div className='page' ref='root'>
        <PostsTable posts={this.state.posts} />
        <div className='posts-table-mobile'>
          {
            this.state.posts.map((data, i) => {
              return <PostsMobile key={i} data={data} />
            })
          }
        </div>
      </div>
    )
  }
}

Posts.defaultProps = {
  title: 'Posty',
  url: 'posts'
}
