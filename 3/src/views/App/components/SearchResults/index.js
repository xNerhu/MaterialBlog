import React from 'react'

import Item from './components/Item'

export default class SearchResults extends React.Component {
  constructor () {
    super()

    this.state = {
      result: [],
      toggled: false
    }

    this.lastQuery = ''

    this.items = []
  }

  /**
   * Search for posts.
   * @param {String} query.
   */
  search = (query) => {
    const self = this
    const root = this.refs.root
    const app = this.props.getApp()
    const toolbar = app.getToolBar()

    if (this.lastQuery !== query) {
      this.items = []
      this.setState({
        result: [],
        toggled: true
      })

      root.style.display = 'block'

      const toolBarItems = app.state.toolbarItems
      var toolBarTitleIndex = 0

      // Get title index.
      for (var i = 0; i < toolBarItems.length; i++) {
        if (toolBarItems[i].type === 'Title') {
          toolBarTitleIndex = i
          break
        }
      }

      // Change title.
      toolBarItems[toolBarTitleIndex].title = 'Wyniki wyszykiwania dla: ' + query

      app.setState({
        tabLayoutHidden: true,
        dataPreloaderVisible: true,
        tabPagesVisible: false
      })

      // Hide tabbar.
      toolbar.setState({
        height: 64
      })

      toolbar.refs.menuIcon.changeToArrow(false)

      setTimeout(function () {
        app.setState({
          dataPreloaderVisible: false
        })
        var result = []
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
        self.setState({
          result: result
        })
      }, 1000)

      this.lastQuery = query
    }
  }

  /**
   * Hides results.
   */
  hide = () => {
    const self = this
    const root = this.refs.root
    const app = this.props.getApp()
    const toolbar = app.getToolBar()
    const menuIcon = toolbar.refs.menuIcon
    const state = menuIcon.actualState

    //root.style.display = 'none'

    this.setState({
      toggled: false
    })

    if (state === 'default') {
      menuIcon.changeToDefault()
    } else if (state === 'exit') {
      menuIcon.changeToExit()
    }

    for (var i = 0; i < this.items.length; i++) {
      this.items[i].style.opacity = '0'
    }

    setTimeout(function () {
      root.style.display = 'none'
    }, 300)

    const toolBarItems = app.state.toolbarItems
    var toolBarTitleIndex = 0

    // Get title index.
    for (var i = 0; i < toolBarItems.length; i++) {
      if (toolBarItems[i].type === 'Title') {
        toolBarTitleIndex = i
        break
      }
    }

    // Change title.
    toolBarItems[toolBarTitleIndex].title = app.props.toolbarTitle

    app.setState({
      tabLayoutHidden: false,
      tabPagesVisible: true
    })

    // Hide tabbar.
    toolbar.setState({
      height: 128
    })

    this.lastQuery = ''
  }

  /**
   * Gets search results
   * @return {SearchResults}
   */
  getSearchResults = () => {
    return this
  }

  render () {
    var index = -1

    return (
      <div className='search-results' ref='root'>
        {
          this.state.result.map((data, i) => {
            index++
            return <Item key={i} data={data} index={index} getSearchResults={this.getSearchResults} />
          })
        }
      </div>
    )
  }
}
