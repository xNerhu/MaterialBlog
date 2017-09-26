import { request } from 'http'

export const getCategories = () => {
  return new Promise(
    (resolve, reject) => {
      fetch('/get-categories', {
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

export const addCategory = (title) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/add-category', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            title: title
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

export const deleteCategory = (_id) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/delete-category', {
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

export const editCategory = (_id, title) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/edit-category', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            _id: _id,
            title: title
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

export const uploadPicture = (_id, base64) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/upload-picture', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            _id: _id,
            picture: base64
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

export const deletePicture = (_id, picture) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/delete-picture', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            _id: _id,
            picture: picture
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
