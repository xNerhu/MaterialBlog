import Component from '../../../helpers/Component'

import Section from './components/Section'

export default class GalleryPage extends Component {
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
    app.loadedPages.gallery = true

    setTimeout(function () {
      app.togglePreloader(false)
      app.isLoading = false
    }, 10)
  }

  render () {
    return (
      <div className='page page-gallery' ref='root'>
        <div className='page-gallery-container'>
          <Section />
        </div>
      </div>
    )
  }
}
