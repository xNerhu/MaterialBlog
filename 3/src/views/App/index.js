import Preloader from '../../imports/materialdesign/components/Preloader'
import TextField from '../../imports/materialdesign/components/TextField'

import Toolbar from './components/Toolbar'

export default class App {
  constructor (parent) {
    window.app = this

    this.parent = parent

    this.elements = {}

    this.render()
  }

  render = () => {
    /*this.elements.preloader = new Preloader('#00ff00')

    this.parent.innerHTML = this.elements.preloader.getRoot().outerHTML*/

    this.elements.toolbar = new Toolbar()

    function onMenuClick () {
      console.log('wrwr')
    }

    const items = [
      {
        type: 'Icon',
        subType: 'MultiIcon',
        position: 'Left',
        onClick: onMenuClick(),
        id: 'toolbar-icon-multi-icon',
        style: {
          width: '24px',
          height: '18px',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)'
        }
      },
      {
        type: 'Title',
        title: 'Posty',
        style: {
          color: '#fff'
        }
      },
      {
        type: 'Icon',
        subType: 'Search',
        id: 'toolbar-icon-search',
        position: 'Right',
        image: 'src/images/Toolbar/search.png',
        onSearch: function (query) {
          if (query.length >= 1) {
            /*self.refs.searchResults.search(query)
            if (navigationDrawer.toggled) navigationDrawer.hide()*/
            console.log(query)
          }
        }
      }
    ]

    this.elements.toolbar.setItems(items)

    this.parent.appendChild(this.elements.toolbar.elements.root)

/*    this.elements.textField = new TextField('Hint', 'Placeholder', 'Helper text', 10)

    this.parent.appendChild(this.elements.textField.getRoot())*/
  }
}
/*
    return (
      <div>
        <div className='app-content' ref='appContent' style={appContentStyle}>
          <Toolbar ref='toolbar' items={this.state.toolbarItems} getApp={this.getApp} shadow={this.state.toolbarShadow}>
            <TabLayout ref='tabLayout' className='tab-layout-1' style={tabLayoutStyle} getApp={this.getApp} />
          </Toolbar>
          <div className='tab-pages' style={tabPagesStyle}>
            <PostsTab ref='postsTab' getApp={this.getApp} />
            <GalleryTab ref='galleryTab' getApp={this.getApp} />
            <AboutClassTab ref='aboutClassTab' getApp={this.getApp} />
            <LessonsPlanTab ref='lessonsPlanTab' getApp={this.getApp} />
          </div>
          <SearchResults ref='searchResults' getApp={this.getApp} />
        </div>
        <LoginDialog ref='loginDialog' getApp={this.getApp} />
        <InfoDialog ref='infoDialog' />
        <Preloader ref='preloader' className='data-preloader' style={preloaderStyle} strokeColor='#2196f3' strokeWidth={4} />
        <NavigationDrawer ref='navigationDrawer' getApp={this.getApp} />
        <Tooltip ref='tooltipLike'>
          {this.state.tooltipsData.like.text}
        </Tooltip>
        <Tooltip ref='tooltipLikesList'>
          {this.state.tooltipsData.like.list}
        </Tooltip>
        <Tooltip ref='tooltipShowComments'>
          Pokaż komentarze
        </Tooltip>
        <Tooltip ref='tooltipHideComments'>
          Ukryj komentarze
        </Tooltip>
        <Tooltip ref='tooltipCategoryInfo'>
          {
            'Data utworzenia: ' + this.state.tooltipsData.category.date + '\n Ilość zdjęć: ' + this.state.tooltipsData.category.picturesCount
          }
        </Tooltip>
        <Tooltip ref='tooltipAddComment'>
          Dodaj komentarz
        </Tooltip>
        <Snackbar ref='snackbar' actionText='ZOBACZ' timeout={7500} onActionClick={this.onSnackbarActionClick}>
          Strona wykorzystuje pliki cookies.
        </Snackbar>
      </div>
    )
  }
}

App.defaultProps = {
  toolbarTitle: 'Blog klasy 3B',
  toolbarBackgroundColor: '#2196F3'
}*/
