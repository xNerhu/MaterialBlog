import Component from '../../../../../../../helpers/Component'

export default class Comment extends Component {
  beforeRender () {
    this.touched = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
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
   * @param {String} date
   * @return {Object} data
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
      <div className='post-comment' ref='root'>
        <div className='post-comment-avatar' ref='avatar' />
        <div className='post-comment-info' ref='info'>
          <div className='post-comment-author' ref='author'>
            AUTHR
          </div>
          <div className='post-comment-content' ref='text'>
            XDDD
          </div>
          <div className='post-comment-date' ref='date'>
            MEISIAC TEMU
          </div>
        </div>
        <div className='post-comment-clear' />
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const data = props.data

    const avatar = this.elements.avatar
    const author = this.elements.author
    const text = this.elements.text

    avatar.style.backgroundImage = 'url(' + data.avatar + ')'
    author.innerHTML = data.author
    text.innerHTML = data.content

    this.setDate()
  }
}
