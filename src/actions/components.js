import Store from '../store'

export const getComponents = (page) => {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const url = '/components?page=' + page

      xhr.open('GET', url, true)
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send()

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.responseText)
          if (!data.success) {
            reject(new Error(data.message))
          }
          resolve(data.data)
        }
      }
    }
  )
}

export const getAllComponents = () => {
  return new Promise(
    (resolve, reject) => {
      fetch('/components/all',
      {
        method: 'GET'
      }).then((res) => {
        return res.json()
      }).then((data) => {
        if (!data.success) {
          reject(new Error(data.message))
        }
        resolve(data.data)
      })
    }
  )
}

export const addComponent = (page, component) => {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const url = '/components'

      xhr.open('POST', url, true)
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({name: component, page: page}))

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.responseText)
          if (!data.success) {
            reject(new Error(data.message))
          }
          resolve(data.data)
        }
      }
    }
  )
}

export const removeComponent = (page, id) => {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const url = '/components'

      xhr.open('DELETE', url, true)
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify({_id: id, page: page}))

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.responseText)
          if (!data.success) {
            reject(new Error(data.message))
          }
          resolve(data.data)
        }
      }
    }
  )
}

export const saveComponent = (page, id, newValues) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/components',
      {
        method: 'PUT',
        body: JSON.stringify({_id: id, page: page, newValues: newValues}),
        headers: new Headers({'content-type': 'application/json'})
      }).then((res) => {
        return res.json()
      }).then((data) => {
        if (!data.success) {
          reject(new Error(data.message))
        }
        resolve(data.data)
      })
    }
  )
}