import Component from '../../../helpers/Component'

export default class AboutClassPage extends Component {
  beforeRender () {
    this.pageData = {
      title: 'O klasie',
      url: 'aboutclass',
      loaded: false
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Loads about class content.
   */
  load () {
    const app = window.app

    setTimeout(function () {
      app.togglePreloader(false)
      app.pagesData.loading = false
    }, 10)
  }

  render () {
    return (
      <div className='page page-about-class' ref='root'>
        About class
      </div>
    )
  }
}
