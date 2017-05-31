import React from 'react'

export default class Comment extends React.Component {
  componentDidMount () {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()

    const commentDate = this.parseDate(this.props.data.date)

    const minutes = minute - commentDate.minute
    const hours = hour - commentDate.hour
    const days = day - commentDate.day
    const months = month - commentDate.month
    const years = year - commentDate.year

    var result = ''

    if (years > 0) {
      if (years === 1) {
        result = 'rok temu'
      } else if (years >= 5) {
        result = years + ' lat temu'
      }
    } else if (months > 0) {
      if (months === 1) {
        result = 'miesiąc temu'
      } else if (months >= 5) {
        result = months + ' miesiący temu'
      } else {
        result = months + ' miesięce temu'
      }
    } else if (days > 0) {
      if (days === 1) {
        result = 'dzień temu'
      } else {
        result = days + ' dni temu'
      }
    } else if (hours > 0) {
      if (hours === 1) {
        result = 'godzinę temu'
      } else if (hours >= 2 && hours <= 4) {
        result = hours + ' godziny temu'
      } else {
        result = hours + ' godzin temu'
      }
    } else if (minutes < 60) {
      if (minutes === 0) {
        result = 'teraz'
      } else if (minutes === 1) {
        result = 'minutę temu'
      } else if (minutes === 2) {
        result = minutes + ' minuty temu'
      } else {
        result = minutes + ' minut temu'
      }
    } else {
      result = 'Error (Component: Comment/index.js)'
    }

    this.refs.date.innerHTML = result
  }

  /**
   * Parses date to object.
   * @param {String} date.
   * @return {Object} date
   */
  parseDate = (str) => {
    const array = str.split('.')
    const _array = array[array.length - 1].split(' ')
    const day = array[0]
    const month = array[1]
    const year = _array[0]
    const time = _array[1].split(':')
    const hour = time[0]
    const minute = time[1]

    return {
      day: day,
      month: month,
      year: year,
      hour: hour,
      minute: minute
    }
  }

  render () {
    return (
      <div className='post-comment'>
        <div className='post-comment-avatar' />
        <div className='post-comment-info'>
          <div className='post-comment-author'>
            {this.props.data.author}
          </div>
          <div className='post-comment-content'>
            {this.props.data.content}
          </div>
          <div className='post-comment-date' ref='date'>
            1d
          </div>
        </div>
        <div className='post-comment-clear' />
      </div>
    )
  }
}
