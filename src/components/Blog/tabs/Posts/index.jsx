import Component from 'inferno-component'
import Url from 'url'

import { getPosts } from '../../../../actions/posts'

import Post from '../../../Post'

import MaterialButton from '../../../../materialdesign/components/MaterialButton'
import Preloader from '../../../../materialdesign/components/Preloader'

export default class PostsTab extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      left: -100,
      posts: [],
      postsRipple: true,
      loadMoreButton: false,
      loadMorePreloader: false
    }

    this.postsCount = 0
    this.page = 0
    this.posts = []
    this.allLoaded = false
    this.selectedPost = null
    this.selectedComment = null
    this.postID = null
  }

  async load () {
    const blog = window.blog

    this.postID = Url.parse(window.location.href, true).query.post
    let posts = []
    let found = false
    let postIndex = -1
    let index = 0

    if (this.postID != null) {
      while (true) {
        const json = await getPosts(this.page)
        if (json.success === false) return console.error(json)

        for (var i = 0; i < json.length; i++) {
          if (json[i]._id === this.postID) {
            found = true
            postIndex = index
            break
          } else {
            index++
          }
        }

        if (json.length === 0) {
          console.error('Post does not exist')
          break
        }

        posts = posts.concat(json)
        if (found) {
          posts[index].disableFirstSelectingAnimation = true
          break
        }

        this.page++
      }
    } else {
      const json = await getPosts(0)
      if (json.success === false) return console.error(json)

      posts = json
      this.page++
    }

    this.setState({
      posts
    })

    setTimeout(() => {
      if (!this.selectedPost && posts.length > 0) {
        this.setState({
          loadMoreButton: true
        })
      }
    }, 200)

    if (found) {
      setTimeout(() => {
        this.selectPost(this.posts[postIndex])
      }, 1)
    }

    blog.togglePreloader(false)
    blog.getTabLayout().isLoading = false
  }

  onScroll = () => {
    if (!window.blog.getTabLayout().isLoading && !this.selectedPost && !this.allLoaded) {
      const isVisible = isVisibleOnScreen(this.elements.loadMoreButton.getRoot())
      if (isVisible) this.loadMorePosts()
    }
  }

  async loadMorePosts () {
    const tabLayout = window.blog.getTabLayout()

    if (this.selectedPost || tabLayout.isLoading || this.allLoaded) return

    tabLayout.isLoading = true

    this.setState({
      loadMoreButton: false,
      loadMorePreloader: true
    })

    let json = await getPosts(this.page)
    if (json.success === false) return console.error(json)

    // Fix bug with loading post from id
    if (this.postID != null) {
      let _posts = []
      let postsID = []

      for (var i = 0; i < this.state.posts.length; i++) {
        postsID.push(this.state.posts[i]._id)
      }

      for (var i = 0; i < json.length; i++) {
        if (postsID.indexOf(json[i]._id) === -1) {
          _posts.push(json[i])
        }
      }

      if (_posts.length === 0 && json.length > 0) {
        this.page++
        tabLayout.isLoading = false
        return this.loadMorePosts()
      }

      json = _posts
    }

    if (json.length < 1) {
      this.allLoaded = true
    }

    const posts = this.state.posts.slice().concat(json)

    this.postsCount = -this.state.posts.length
    this.page++

    this.setState({
      posts,
      loadMoreButton: !this.allLoaded,
      loadMorePreloader: false
    })

    tabLayout.isLoading = false
  }

  onPostLoad = (post) => {
    this.posts.push(post)
  }

  onPostClick = (e, post) => {
    this.selectPost(post)
  }

  selectPost (postToSelect) {
    const blog = window.blog
    const tabLayout = blog.getTabLayout()
    const navigationDrawer = blog.elements.navigationDrawer
    const multiIcon = blog.getMultiIcon()

    if (blog.getTabLayout().isLoading) return

    // Toggle tabs, multi icon and load more posts button
    blog.toggleTabLayout(!postToSelect)

    this.setState({
      loadMoreButton: (!this.allLoaded) ? !postToSelect : false,
      postsRipple: !postToSelect
    })

    if (postToSelect) multiIcon.changeToArrow()
    else multiIcon.changeToDefault()

    if (postToSelect && navigationDrawer.toggled) navigationDrawer.hide()

    const postToSelectRoot = (postToSelect || this.selectedPost).getRoot()

    postToSelectRoot.style.marginTop = ((postToSelect) ? 0 : 32) + 'px'
    postToSelectRoot.style.maxWidth = (postToSelect) ? '100%' : '640px'

    for (var i = 0; i < this.posts.length; i++) {
      const post = this.posts[i]
      const postRoot = post.getRoot()

      if (postToSelect && post !== postToSelect) {
        postRoot.style.opacity = '0'

        setTimeout(() => {
          postRoot.style.display = 'none'
        }, 150)
      } else if (!postToSelect && post !== this.selectedPost) {
        postRoot.style.display = 'block'

        setTimeout(() => {
          postRoot.style.opacity = '1'
        }, 10)
      }
    }

    if (!postToSelect) {
      setTimeout(() => {
        postToSelectRoot.scrollIntoView()
      }, 20)
    }

    this.selectedPost = postToSelect

    const tab = tabLayout.tabs[tabLayout.selectedTabIndex].props.data.url
    let url = `?tab=${(tab)}`
    if (postToSelect) url += `&post=${postToSelect.props.data._id}`
    window.history.pushState('', '', url)
  }

  render () {
    const style = {
      left: this.state.left + '%'
    }

    const loadMoreButtonStyle = {
      display: (this.state.loadMoreButton) ? 'block' : 'none'
    }

    const loadMorePreloaderStyle = {
      display: (this.state.loadMorePreloader) ? 'block' : 'none'
    }

    let index = 0

    return (
      <div className='tab-page posts' ref={(e) => this.elements.root = e} style={style} onScroll={this.onScroll}>
        {
          this.state.posts.map((data, key) => {
            this.postsCount++
            return <Post data={data} animation={true} index={this.postsCount - 1} onLoad={this.onPostLoad} onClick={this.onPostClick} userInfo={window.blog.state.userInfo} ripple={this.state.postsRipple} />
          })
        }
        <MaterialButton
          ref={(e) => this.elements.loadMoreButton = e}
          className='load-more-button'
          text='ZAŁADUJ WIĘCEJ'
          style={loadMoreButtonStyle}
          onClick={(e) => { this.loadMorePosts() }}
        />
        <Preloader className='load-more-preloader' style={loadMorePreloaderStyle} />
      </div>
    )
  }

  componentDidMount () {
    window.blog.tabs.push(this)
  }
}
