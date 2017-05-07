import React from 'react'
import {Motion} from 'react-motion'

export default class LessonsPlanTab extends React.Component {
  constructor () {
    super()

    this.state = {
      left: 0,
      display: 'none',
      defaultLeft: 0
    }

    this.isVisible = false

    this.root = null

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

  loadPlan = () => {
    var self = this

    this.props.getApp().setState({
      dataPreloaderVisible: true
    })
    this.props.getApp().selected.lessonsPlan = true
    this.props.getApp().canSelectTab = false

    // TODO: make request
    setTimeout(function () {
      self.props.getApp().setState({
        dataPreloaderVisible: false
      })
      self.props.getApp().canSelectTab = true
      var plan = [
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

      var html = ''
      for (var p = 0; p < plan.length; p++) {
        var hours = ''
        for (var i = 0; i < plan[p].subjects.length; i++) {
          hours += '<span class="bold">' + (i + 1) + '.</span> ' + self.lessonsStart[i] + '-' + self.lessonsFinish[i] + ((i < plan[p].subjects.length) ? '<br />' : '')
        }

        var subjects = ''
        for (var i = 0; i < plan[p].subjects.length; i++) {
          subjects += plan[p].subjects[i] + ((i < plan[p].subjects.length) ? '<br />' : '')
        }

        const border = (p > 0) ? 'class="border"' : ''

        html += '<tr ' + border + '><td>' + plan[p].day + '</td><td>' + hours + '</td><td>' + subjects + '</td></tr>'
      }

      self.tbody.innerHTML = html
    }, 1000)
  }

  /**
   * Gets root.
   * @param {DomElement}
   */
  getRoot = () => {
    return this.root
  }

  render () {
    var self = this
    function onRest () {
      if (!self.isVisible) {
        self.setState({display: 'none'})
      }
    }

    return (
      <Motion onRest={onRest} style={{left: this.state.left}}>
        {value =>
          <div className='lesson-plan-tab tab-page' ref={(t) => { this.root = t }} style={{left: value.left, display: this.state.display}}>
            <table className='material-table'>
              <thead>
                <tr>
                <th>Dzień tygodnia</th>
                <th>Godzina lekcyjna</th>
                <th>Przedmiot</th>
                </tr>
              </thead>
              <tbody ref={(t) => { this.tbody = t }} />
            </table>
          </div>}
      </Motion>
    )
  }
}
