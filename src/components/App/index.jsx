import Component from 'inferno-component'
import { Router, Route } from 'inferno-router'
import createBrowserHistory from 'history/createBrowserHistory'
const browserHistory = createBrowserHistory()
window.browserHistory = browserHistory

import MenuManager from '../../utils/MenuManager'

import Blog from '../Blog'

import Panel from '../Panel'
import Login from '../Login'
import Register from '../Register'

import PostsPage from '../Panel/pages/Posts'
import GalleryPage from '../Panel/pages/Gallery'
import LessonsPlanPage from '../Panel/pages/LessonsPlan'
import ManageAccountPage from '../Panel/pages/ManageAccount'

import Menu from '../../materialdesign/components/Menu'
import Tooltip from '../../materialdesign/components/Tooltip'
import Snackbar from '../../materialdesign/components/Snackbar'

export default class App extends Component {
  constructor () {
    super()
    this.globalElements = {}
    this.blogElements = {}
    this.panelElements = {}

    window.app = this

    this.toggledMenu = false
  }

  getLocationPath () {
    return browserHistory.location.pathname
  }

  getBrowserHistory () {
    return browserHistory
  }

  /**
   * On click event.
   * Hides menu.
   * @param {Event}
   */
  onClick = (e) => {
    MenuManager.toggle(false)
  }

  showSnackbar (text) {
    this.setState({
      snackbarText: text
    })

    this.globalElements.snackbar.show()
  }

  showTooltip (target, text) {
    const tooltip = this.globalElements.tooltip

    tooltip.setText(text)
    tooltip.show(target)
  }

  render () {
    return (
      <div>
        <Router history={browserHistory}>
          <Route path='/' component={Blog} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/panel' component={Panel}>
            <Route component={PostsPage} />
            <Route path='/gallery' component={GalleryPage} />
            <Route path='/lessonsplan' component={LessonsPlanPage} />
            <Route path='/manageaccount' component={ManageAccountPage} />
          </Route>
        </Router>
        <Menu ref={(e) => this.blogElements.commentMenu = e} className='toolbar-menu' mobile={true} />
        <Menu ref={(e) => this.panelElements.toolbarMenu = e} className='toolbar-menu' mobile={true} />
        <Menu ref={(e) => this.panelElements.postMenu = e} className='toolbar-menu' mobile={true} />
        <Menu ref={(e) => this.panelElements.categoryMenu = e} className='toolbar-menu' mobile={true} />
        <Menu ref={(e) => this.panelElements.lessonsPlanMenu = e} className='toolbar-menu' mobile={true} />
        <Snackbar ref={(e) => this.globalElements.snackbar = e} text='' />
        <Tooltip ref={(e) => this.globalElements.tooltip = e} text='' />
      </div>
    )
  }

  componentDidMount () {
    // Set menus items
    MenuManager.setBlogCommentMenuItems()
    MenuManager.setPanelToolbarMenuItems()
    MenuManager.setPanelPostMenuItems()
    MenuManager.setPanelCategoryMenuItems()
    MenuManager.setPanelLessonsPlanMenu()

    const menus = [
      this.blogElements.commentMenu,
      this.panelElements.toolbarMenu,
      this.panelElements.postMenu,
      this.panelElements.categoryMenu,
      this.panelElements.lessonsPlanMenu
    ]

    for (var i = 0; i < menus.length; i++) {
      menus[i].getRoot().style.width = '0px'
    }
  }
}
