export default class Comment {
  constructor (data) {
    this.elements = {}

    this.touched = false

    this.props = {
      data: data
    }

    this.render()
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Sets date.
   */
  setDate = () => {
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

    let result = ''

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

    this.elements.date.innerHTML = result
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

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'post-comment'

    // AVATAR
    this.elements.avatar = document.createElement('div')
    this.elements.avatar.className = 'post-comment-avatar'
    this.elements.avatar.style.backgroundImage = 'url(' + this.props.data.avatar + ')'
    this.elements.root.appendChild(this.elements.avatar)

    // INFO
    this.elements.info = document.createElement('div')
    this.elements.info.className = 'post-comment-info'
    this.elements.root.appendChild(this.elements.info)

    // AUTHOR
    this.elements.author = document.createElement('div')
    this.elements.author.className = 'post-comment-author'
    this.elements.author.innerHTML = this.props.data.author
    this.elements.info.appendChild(this.elements.author)

    // TEXT
    this.elements.text = document.createElement('div')
    this.elements.text.className = 'post-comment-content'
    this.elements.text.innerHTML = this.props.data.content
    this.elements.info.appendChild(this.elements.text)

    // DATE
    this.elements.date = document.createElement('div')
    this.elements.date.className = 'post-comment-date'
    this.elements.info.appendChild(this.elements.date)

    // CLEAR
    this.elements.clear = document.createElement('div')
    this.elements.clear.className = 'post-comment-clear'
    this.elements.root.appendChild(this.elements.clear)

    this.setDate()
  }
}
