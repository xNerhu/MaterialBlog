import Component from './../../../../helpers/Component/index'

import Item from './components/Item'

export default class SearchResults extends Component {
  beforeRender () {
    this.toggled = false

    this.lastQuery = ''
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Search for posts.
   * @param {String} query.
   */
  search = (query) => {
    const self = this
    const app = window.app
    const tabPages = app.elements.tabPages
    const toolbar = app.getToolbar()
    const multiIcon = toolbar.getMultiIcon()

    if (this.lastQuery !== query && query !== '') {
      const root = this.getRoot()

      root.innerHTML = ''

      tabPages.style.opacity = '0'
      toolbar.setTitle('Wyniki wyszykiwania dla: ' + query)
      toolbar.toggleTabs(false)

      multiIcon.changeToArrow()

      root.style.display = 'block'

      app.loading = true
      app.togglePreloader(true)

      setTimeout(function () {
        app.loading = false
        app.togglePreloader(false)

        let result = []

        for (var i = 0; i < query.length; i++) {
          const r = {
            id: i,
            title: i,
            text: query[i],
            author: 'Mikołaj Palkiewicz',
            date: '28.05.2017 14:00'
          }
          result.push(r)
        }

        result[0].media = 'http://www.hdwallpapers.in/thumbs/2017/far_cry_5_artwork_4k-t1.jpg'

        for (var i = 0; i < result.length; i++) {
          const element = (
            <Item data={result[i]} index={i} />
          )

          self.renderComponents(element, root)
        }
      }, 1000)

      this.lastQuery = query
      this.toggled = true
    }
  }

  /**
   * Hides search results.
   */
  hide = () => {
    const app = window.app
    const tabPages = app.elements.tabPages
    const toolbar = app.getToolbar()
    const multiIcon = toolbar.getMultiIcon()
    const root = this.getRoot()

    tabPages.style.opacity = '1'
    toolbar.setTitle(app.props.defaultTitle)
    toolbar.toggleTabs(true)

    multiIcon.changeToDefault()

    root.style.display = 'none'
    root.innerHTML = ''

    this.lastQuery = ''
    this.toggled = false
  }

  render () {
    return (
      <div className='search-results' ref='root' />
    )
  }
}
