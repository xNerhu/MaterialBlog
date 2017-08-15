import Component from '../../../helpers/Component'

export default class AboutClassTab extends Component {
  /**
   * Gets root.
   * @param {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * TODO
   */
  load = () => {
    const app = window.app

    app.tabsLoaded.aboutClass = true
    app.togglePreloader(false)
    app.isLoading = false
  }

  render () {
    return (
      <div className='about-class-tab tab-page' ref='root'>
        About class
      </div>
    )
  }
}
