import Component from '../../../helpers/Component'

import Day from './components/Day'

export default class LessonsPlanPage extends Component {
  beforeRender () {
    this.pageData = {
      title: 'Plan lekcji',
      url: 'lessonsplan',
      loaded: false
    }

    this.lessonsPlan = []

    this.dayNames = [
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek'
    ]

    this.days = []
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Loads categories.
   */
  load () {
    const self = this

    const app = window.app

    setTimeout(function () {
      app.togglePreloader(false)
      app.pagesData.loading = false

      self.lessonsPlan = [
        {
          subjects: [
            'WOS',
            'Niemiecki',
            'Polski',
            'Niemiecki'
          ]
        },
        {
          subjects: [
            'Fizyka'
          ]
        }
      ]

      for (var i = 0; i < self.lessonsPlan.length; i++) {
        const day = (
          <Day data={self.lessonsPlan[i]} getLessonsPlanPage={() => { return self }} />
        )

        self.renderComponents(day, self.elements.container)
      }
    }, 10)
  }

  render () {
    return (
      <div className='page page-lessons-plan' ref='root'>
        <div className='lessons-plan-container' ref='container' />
      </div>
    )
  }
}
