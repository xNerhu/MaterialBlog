import Component from '../../../helpers/Component'

export default class LessonsPlanPage extends Component {
  beforeRender () {
    this.pageData = {
      title: 'Plan lekcji',
      url: 'lessonsplan',
      loaded: false
    }
  }

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

    setTimeout(function () {
      app.togglePreloader(false)
      app.pagesData.loading = false
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
