import Component from '../../../../../../../helpers/Component'

export default class Subject extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * On mouse enter.
   * @param {Event}
   */
  onMouseEnter = (e) => {
    const day = this.props.getDay()

    if (day.isMovingMode) {
      const lastEnteredSubject = day.lastEnteredSubject

      if (lastEnteredSubject != null) {
        day.clearBorderFromLastEnterSubject()
      }

      const root = this.getRoot()

      root.classList.add((day.subjects.indexOf(this) < 0) ? 'border-top' : 'border')

      day.lastEnteredSubject = this
    }
  }

  /**
   * On mouse down.
   * @param {Event}
   */
  onMouseDown = (e) => {
    this.props.getDay().toggleMovingMode(true, this)
  }

  render () {
    return (
      <div className='subject' ref='root' onMouseDown={this.onMouseDown} onMouseEnter={this.onMouseEnter}>
        <div className='hour'>
          8.00-8.45
        </div>
        <div className='name'>
          {
            this.props.name
          }
        </div>
        <div className='menu-icon' />
      </div>
    )
  }

  afterRender () {
    this.props.getDay().subjects.push(this)
  }
}
