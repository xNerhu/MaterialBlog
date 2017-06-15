import Component from '../../../helpers/Component'

export default class AboutClassPage extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Loads about class.
   */
  load = () => {
    const app = window.app
    app.loadedPages.aboutClass = true

    setTimeout(function () {
      app.togglePreloader(false)
      app.isLoading = false
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
