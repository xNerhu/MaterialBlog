export default class LessonsPlanTab {
  constructor () {
    this.elements = {}

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
   * Loads lessons plan.
   */
  loadPlan = () => {
    const self = this
    const app = this.props.getApp()

    app.togglePreloader(true)
    app.selected.lessonsPlan = true
    app.canSelectTab = false

    // TODO: make request
    setTimeout(function () {
      app.togglePreloader(false)
      app.canSelectTab = true

      const plan = [
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

      self.refs.tbody.innerHTML = self.parsePlan(plan)
      self.refs.table.style.opacity = '1'
    }, 1000)
  }

  /**
   * Gets root.
   * @param {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Loads plan.
   */
  load = () => {
    const self = this
    const app = window.app
    const root = this.getRoot()
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
   * @param {Object} plan for a day.
   * @return {DOMElement} table cell.
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

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'lesson-plan-tab tab-page'

    // MATERIAL TABLE
    this.elements.table = document.createElement('table')
    this.elements.table.className = 'material-table'
    this.elements.root.appendChild(this.elements.table)

    this.elements.thead = document.createElement('thead')
    this.elements.table.appendChild(this.elements.thead)

    // HEADER
    const tr = document.createElement('tr')
    this.elements.thead.appendChild(tr)

    const th1 = document.createElement('th')
    th1.innerHTML = 'Dzień tygodnia'
    tr.appendChild(th1)

    const th2 = document.createElement('th')
    th2.innerHTML = 'Godzina lekcyjna'
    tr.appendChild(th2)

    const th3 = document.createElement('th')
    th3.innerHTML = 'Przedmiot'
    tr.appendChild(th3)

    // TBODY
    this.elements.tbody = document.createElement('tbody')
    this.elements.table.appendChild(this.elements.tbody)
    /*return (
      <div className='lesson-plan-tab tab-page' ref='root'>
        <table className='material-table' ref='table'>
          <thead>
            <tr>
              <th>Dzień tygodnia</th>
              <th>Godzina lekcyjna</th>
              <th>Przedmiot</th>
            </tr>
          </thead>
          <tbody ref='tbody' />
        </table>
      </div>
    )*/
  }
}
