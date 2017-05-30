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
    const menuIcon = toolbar.refs.menuIcon

    if (this.lastQuery !== query) {
      this.items = []
      this.setState({
        result: [],
        toggled: true
      })

      root.style.display = 'block'

      app.setToolBarTitle('Wyniki wyszykiwania dla: ' + query)
      app.hideTabLayout()
      app.togglePreloader(true)
      app.setState({
        toggledTabPages: false
      })

      if (menuIcon.isExit) {
        menuIcon.changeToDefault()
        setTimeout(function () {
          menuIcon.changeToArrow(false)
        }, 150)
      } else {
        menuIcon.changeToArrow(false)
      }

      // TODO: Make request
      setTimeout(function () {
        app.togglePreloader(false)

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
    const root = this.refs.root
    const app = this.props.getApp()
    const toolbar = app.getToolBar()
    const menuIcon = toolbar.refs.menuIcon
    const state = menuIcon.actualState

    this.setState({
      toggled: false,
      result: []
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

    app.setToolBarTitle(app.props.toolbarTitle)
    app.showTabLayout()
    app.setState({
      toggledTabPages: true
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
