import Component from '../../../helpers/Component'

export default class LessonsPlanPage extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Loads categories.
   */
  load = () => {
    const app = window.app
    app.loadedPages.lessonsPlan = true

    setTimeout(function () {
      app.togglePreloader(false)
      app.isLoading = false
    }, 10)
  }

  render () {
    return (
      <div className='page page-lessons-plan' ref='root'>
        Lessons plan
      </div>
    )
  }
}
