import Component from '../../../helpers/Component'

export default class LessonsPlanTab extends Component {
  beforeRender () {
    this.lessonsStart = [
      '8.00',
      '8.50',
      '9.40',
      '10.30',
      '11.30',
      '12.20',
      '13.30',
      '14.20'
    ]

    this.lessonsFinish = [
      '8.45',
      '9.35',
      '10.25',
      '11.15',
      '12.15',
      '13.05',
      '14.15',
      '15.05'
    ]

    this.plan = []
  }

  /**
   * Gets root.
   * @param {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Loads plan
   */
  load = () => {
    const self = this
    const app = window.app
    const table = this.elements.table
    const tbody = this.elements.tbody

    app.tabsLoaded.lessonsPlan = true

    setTimeout(function () {
      app.togglePreloader(false)
      app.isLoading = false

      self.plan = [
        {
          day: 'Poniedziałek',
          subjects: [
            'WOS',
            'Niemiecki',
            'Polski',
            'Niemiecki'
          ]
        },
        {
          day: 'Wtorek',
          subjects: [
            'Fizyka'
          ]
        }
      ]

      for (let p = 0; p < self.plan.length; p++) {
        const cell = self.parsePlan(self.plan[p])

        tbody.appendChild(cell)
      }

      table.style.opacity = '1'
    }, 500)
  }

  /**
   * Parses plan into table cell.
   * @param {Object} plan for a day
   * @return {DOMElement} table cell
   */
  parsePlan = (plan) => {
    const _day = plan.day
    const _subjects = plan.subjects

    const cell = document.createElement('tr')
    if (this.plan.indexOf(plan) > 0) cell.className = 'border'

    const day = document.createElement('td')
    day.innerHTML = _day
    cell.appendChild(day)

    const hours = document.createElement('td')
    cell.appendChild(hours)

    for (let i = 0; i < _subjects.length; i++) {
      const start = this.lessonsStart[i]
      const finish = this.lessonsFinish[i]

      const hour = start + '-' + finish

      const element = document.createElement('div')
      hours.appendChild(element)
      const index = document.createElement('span')
      element.appendChild(index)
      index.className = 'bold'
      index.innerHTML = i + 1 + '. '

      const value = document.createElement('span')
      element.appendChild(value)
      value.innerHTML = hour
    }

    const subjects = document.createElement('td')
    cell.appendChild(subjects)

    for (let i = 0; i < _subjects.length; i++) {
      const subject = _subjects[i]

      const element = document.createElement('div')
      subjects.appendChild(element)
      const index = document.createElement('span')
      element.appendChild(index)
      index.className = 'bold'
      index.innerHTML = i + 1 + '. '

      const value = document.createElement('span')
      element.appendChild(value)
      value.innerHTML = subject
    }

    return cell
  }

  render () {
    return (
      <div className='lessons-plan-tab tab-page' ref='root'>
        <table className='material-table' ref='table'>
          <thead>
            <tr>
              <th>
                Dzień tygodnia
              </th>
              <th>
                Godzina lekcyjna
              </th>
              <th>
                Przedmiot
              </th>
            </tr>
          </thead>
          <tbody ref='tbody' />
        </table>
      </div>
    )
  }
}
