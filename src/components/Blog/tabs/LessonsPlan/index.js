import Component from 'inferno-component'

import { getLessonsPlan } from '../../../../actions/lessons-plan'

import Day from '../../../Day'

export default class LessonsPlanTab extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      left: 100,
      days: [],
      hours: []
    }

    this.daysOfWeek = [
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek'
    ]
  }

  async load () {
    const blog = window.blog

    const json = await getLessonsPlan()
    if (json.success === false) return console.error(json)

    this.setState({
      days: json.days,
      hours: json.hours
    })

    blog.togglePreloader(false)
    blog.getTabLayout().isLoading = false
    this.elements.container.style.opacity = '1'
  }

  render () {
    let index = 0

    const style = {
      left: this.state.left + '%'
    }

    return (
      <div className='tab-page lessons-plan' ref={(e) => this.elements.root = e} style={style}>
        <div className='lessons-plan-container' ref={(e) => this.elements.container = e}>
          {
            this.state.days.map((data, key) => {
              index++
              return <Day data={data} key={key} index={index - 1} daysOfWeek={this.daysOfWeek} hours={this.state.hours} />
            })
          }
        </div>
      </div>
    )
  }

  componentDidMount () {
    window.blog.tabs.push(this)
  }
}
