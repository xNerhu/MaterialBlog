import { request } from 'http'

export const login = (login, password) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/login', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            username: login,
            password: password
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

export const register = (login, username, email, avatar, password, passwordVerify, checkbox) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/register', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            login: login,
            username: username,
            email: email,
            avatar: avatar,
            password: password,
            passwordverify: passwordVerify,
            checkbox: checkbox
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
