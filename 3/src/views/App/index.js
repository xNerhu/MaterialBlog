import React from 'react'
import ReactDOM from 'react-dom'

import Toolbar from './components/Toolbar'
import TabLayout from './components/TabLayout'
import Tab from './components/TabLayout/components/Tab'

import PostsTab from '../Tabs/Posts'
import GalleryTab from '../Tabs/Gallery'
import AboutClassTab from '../Tabs/AboutClass'
import LessonPlanTab from '../Tabs/LessonPlan'

export default class App extends React.Component {
  constructor () {
    super()

    this.state = ({
      toolbarItems: [],
      tabLayoutLeft: 48
    })
  }

  componentDidMount () {
    function onClickMenu () {

    }
    this.setState({
      toolbarItems: [
        {
          type: 'Icon',
          position: 'Left',
          image: 'src/images/Toolbar/menu.png',
          onClick: onClickMenu,
          style: {opacity: 1}
        },
        {
          type: 'Title',
          title: 'Blog klasy 3B',
          style: {color: '#fff'}
        },
        {
          type: 'Icon',
          position: 'Right',
          image: 'src/images/Toolbar/search.png',
          onClick: onClickMenu,
          style: {opacity: 1}
        }
      ]
    })

    this.refs.tabLayout.setState({
      tabs: [
        {
          title: 'POSTY',
          page: this.refs.postsTab
        },
        {
          title: 'GALERIA',
          page: this.refs.galleryTab
        },
        {
          title: 'O KLASIE',
          page: this.refs.aboutClassTab
        },
        {
          title: 'PLAN LEKCJI',
          page: this.refs.lessonPlanTab
        }
      ]
    })
  }

  getApp = () => {
    return this
  }

  render () {
    var tabLayoutStyle = {
      left: this.state.tabLayoutLeft
    }
    return (
     <div>
       <Toolbar height={128} items={this.state.toolbarItems} getApp={this.getApp}>
         <TabLayout ref='tabLayout' className='tab-layout-1' style={tabLayoutStyle}>

         </TabLayout>
       </Toolbar>
       <div className='tab-pages'>
         <PostsTab ref='postsTab' />
         <GalleryTab ref='galleryTab' />
         <AboutClassTab ref='aboutClassTab' />
         <LessonPlanTab ref='lessonPlanTab' />
       </div>
     </div>
    )
  }
}
