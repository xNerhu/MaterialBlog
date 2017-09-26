import { request } from 'http'

export const userInfo = () => {
  return new Promise(
    (resolve, reject) => {
      fetch('/user-info', {
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


export const getModerators = () => {
  return new Promise(
    (resolve, reject) => {
      fetch('/get-moderators', {
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

export const changeUserSettings = (login, username, email, avatar, password, passwordVerify) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/change-user-settings', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            login: login,
            username: username,
            email: email,
            avatar: avatar,
            password: password,
            passwordVerify: passwordVerify
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
