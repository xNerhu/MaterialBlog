export default class PageManager {
  /**
   * Selects page.
   * @param {Page}
   */
  static selectPage (page) {
    const app = window.app

    if (app.selectedPage !== page && !app.isLoading) {
      const data = page.pageData
      const appPagesData = app.pagesData

      const toolbar = app.getToolbar()
      const navigationDrawer = app.getNavigationDrawer()

      toolbar.setTitle(data.title)

      if (navigationDrawer.toggled) navigationDrawer.hide()

      if (!data.loaded) {
        data.loaded = true

        app.togglePreloader(true)
        appPagesData.loading = true

        page.load()
      }

      this.toggle(true, page)

      // Change page param in url
      const url = '?page=' + data.url.toLowerCase()
      window.history.pushState('', '', url)

      if (app.selectedPage != null) {
        this.deselectPage(app.selectedPage, page)
      }

      app.selectedPage = page

      if (typeof page.onSelect === 'function') page.onSelect()
    }
  }

  /**
   * Deselects page.
   * @param {Page} page to deselect
   * @param {Page} selected page
   */
  static deselectPage (page, selectedPage) {
    if (typeof page.onDeselect === 'function') page.onDeselect(selectedPage)

    this.toggle(false, page)
  }

  /**
   * Shows or hides page.
   * @param {Boolean}
   * @param {Page}
   */
  static toggle (flag, page) {
    const pageRoot = page.getRoot()

    if (flag) {
      pageRoot.style.display = 'block'

      setTimeout(function () {
        pageRoot.style.opacity = '1'
      }, 10)
    } else {
      pageRoot.style.opacity = '0'

      setTimeout(function () {
        pageRoot.style.display = 'none'
      }, 300)
    }
  }
}
