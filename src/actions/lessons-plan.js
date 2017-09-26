import { request } from 'http'

export const getLessonsPlan = () => {
  return new Promise(
    (resolve, reject) => {
      fetch('/get-lessons-plan', {
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

export const setLessonsPlan = (_id, subjects) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/set-lessons-plan-day', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            _id: _id,
            subjects: JSON.stringify(subjects)
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

export const setLessonsPlanHours = (hours) => {
  return new Promise(
    (resolve, reject) => {
      fetch('/set-lessons-plan-hours', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(
          {
            hours: hours
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
