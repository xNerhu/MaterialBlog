import React from 'react'

export default class Comment extends React.Component {
  render () {
    return (
      <div className='post-comment'>
        <div className='post-comment-avatar' />
        <div className='post-comment-info'>
          <div className='post-comment-author'>
            Mikołaj Palkiewicz
          </div>
          <div className='post-comment-text'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className='post-comment-date'>
            1d
          </div>
        </div>
        <div className='post-comment-clear' />
      </div>
    )
  }
}

Comment.defaultProps = {
  ripple: true
}
