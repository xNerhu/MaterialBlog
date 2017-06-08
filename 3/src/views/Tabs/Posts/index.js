import Post from './components/Post'

export default class PostsTab {
  constructor () {
    this.elements = {}

    this.postsData = []

    this.render()
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  load = () => {
    const root = this.getRoot()
    const posts = this.elements.posts

    this.postsData = [
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

    for (let i = 0; i < this.postsData.length; i++) {
      const post = new Post(this.postsData[i], i)

      posts.appendChild(post.getRoot())
    }
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'posts-tab tab-page'

    this.elements.posts = document.createElement('div')
    this.elements.posts.className = 'posts'

    this.elements.root.appendChild(this.elements.posts)

    this.load()
  }
}
