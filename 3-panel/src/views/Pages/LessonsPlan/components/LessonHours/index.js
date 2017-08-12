import Component from '../../../../../helpers/Component'

import ExpansionPanel from '../ExpansionPanel'

import Item from './components/Item'

export default class Day extends Component {
  beforeRender () {
    this.items = []
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  addItems () {
    this.items = []

    const lessonsPlanPage = this.props.getLessonsPlanPage()

    for (var i = 0; i < lessonsPlanPage.lessonsStart.length; i++) {
      this.addItem(lessonsPlanPage.lessonsStart[i], lessonsPlanPage.lessonsFinish[i])
    }

    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i]

      item.elements.start.setValue(lessonsPlanPage.lessonsStart[i], false)
      item.elements.finish.setValue(lessonsPlanPage.lessonsFinish[i], false)
    }
  }

  addItem (start, finish) {
    const item = (
      <Item start={start} finish={finish} getLessonHours={() => { return this }} />
    )

    this.renderComponents(item, this.container)
  }

  render () {
    return (
      <ExpansionPanel className='hours-expansion-panel' ref='root'>
        <div className='container' ref={(e) => { this.container = e }} />
      </ExpansionPanel>
    )
  }

  afterRender () {
    this.getRoot().setTitle('Godziny lekcji')

    this.addItems()
  }
}
