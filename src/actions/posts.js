import { request } from 'http'

export const getPosts = (page = 'all', user = 'all', timePeriod) => {
  return new Promise(
    (resolve, reject) => {
      let url = '/get-posts?'

      if (page === 'all') {
        url += 'all=true'
      } else {
        url += 'page=' + page
      }

      if (user) url += '&user=' + user
      if (timePeriod) url += '&timeperiod=' + timePeriod

      fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: new Headers({'content-type': 'application/json'})
      }).then((res) => {
        return res.json()
      }).then((data) => {
        resolve(data)
      })
    }
  )
}

export const addPost = (title, content, media) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/add-post', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            title: title,
            content: content,
            media: media
          }
        ),
        headers: new Headers({'content-type': 'application/json'})
      }).then((res) => {
        return res.json()
      }).then((data) => {
        resolve(data)
      })
    }
  )
}

export const deletePost = (_id) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/delete-post', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            _id: _id
          }
        ),
        headers: new Headers({'content-type': 'application/json'})
      }).then((res) => {
        return res.json()
      }).then((data) => {
        resolve(data)
      })
    }
  )
}

export const editPost = (_id, title, content, media) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/edit-post', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            _id: _id,
            title: title,
            content: content,
            media: media
          }
        ),
        headers: new Headers({'content-type': 'application/json'})
      }).then((res) => {
        return res.json()
      }).then((data) => {
        resolve(data)
      })
    }
  )
}

export const likePost = (_id) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/like-post', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            _id: _id
          }
        ),
        headers: new Headers({'content-type': 'application/json'})
      }).then((res) => {
        return res.json()
      }).then((data) => {
        resolve(data)
      })
    }
  )
}

export const addComment = (_id, content) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/add-comment', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            _id: _id,
            content: content
          }
        ),
        headers: new Headers({'content-type': 'application/json'})
      }).then((res) => {
        return res.json()
      }).then((data) => {
        resolve(data)
      })
    }
  )
}

export const editComment = (_id, commentid, content) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/edit-comment', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            _id: _id,
            commentid: commentid,
            content: content
          }
        ),
        headers: new Headers({'content-type': 'application/json'})
      }).then((res) => {
        return res.json()
      }).then((data) => {
        resolve(data)
      })
    }
  )
}

export const deleteComment = (_id, commentid, content) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/delete-comment', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            _id: _id,
            commentid: commentid,
            content: content
          }
        ),
        headers: new Headers({'content-type': 'application/json'})
      }).then((res) => {
        return res.json()
      }).then((data) => {
        resolve(data)
      })
    }
  )
}
