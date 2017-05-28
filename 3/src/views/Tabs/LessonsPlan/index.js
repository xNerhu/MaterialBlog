import React from 'react'

export default class LessonsPlanTab extends React.Component {
  constructor () {
    super()

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
   * Parses plan into html string.
   * @param {Object} plan.
   * @return {String} html string.
   */
  parsePlan = (plan) => {
    var html = ''

    for (var p = 0; p < plan.length; p++) {
      var hours = ''
      for (let i = 0; i < plan[p].subjects.length; i++) {
        hours += '<span class="bold">' + (i + 1) + '.</span> ' + this.lessonsStart[i] + '-' + this.lessonsFinish[i] + ((i < plan[p].subjects.length) ? '<br />' : '')
      }

      var subjects = ''
      for (let i = 0; i < plan[p].subjects.length; i++) {
        subjects += plan[p].subjects[i] + ((i < plan[p].subjects.length) ? '<br />' : '')
      }

      const border = (p > 0) ? 'class="border"' : ''

      html += '<tr ' + border + '><td>' + plan[p].day + '</td><td>' + hours + '</td><td>' + subjects + '</td></tr>'
    }

    return html
  }

  /**
   * Gets root.
   * @param {DomElement}
   */
  getRoot = () => {
    return this.refs.root
  }

  render () {
    return (
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
    )
  }
}
