import Component from 'inferno-component'

import { deletePicture } from '../../actions/gallery'

import Picture from './components/Picture'

export default class PicturesDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      pictures: [],
      toggledPicture: false,
      pictureVerticalPosition: false,
      pictureUrl: ''
    }

    this.toggled = false
    this.toggledDeletingMode = false
    this.toggledFullScreenPicture = false

    this.pictures = []
  }

  toggle (flag, categoryData) {
    const root = this.elements.root

    root.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(() => {
      root.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 200)

    const parentComponent = (this.props.panel) ? window.panel : window.blog

    const {
      component,
      deletingMode,
      panel
    } = this.props

    const toolbar = parentComponent.elements.toolbar
    const multiIcon = toolbar.elements.multiIcon

    if (!panel) parentComponent.toggleTabLayout(!categoryData)

    if (flag) {
      parentComponent.elements.navigationDrawer.hide()
      multiIcon.changeToArrow()
      if (deletingMode && panel) toolbar.showItems([window.panel.elements.toolbarMoreIcon])

      this.pictures = []
      this.setState({
        pictures: categoryData.pictures
      })

    } else {
      multiIcon.changeToDefault()
      if (deletingMode && panel) toolbar.hideItems([window.panel.elements.toolbarMoreIcon])

      this.setState({
        pictures: []
      })
    }

    parentComponent.setState({
      toolbarTitle: (flag) ? categoryData.title : parentComponent.defaultToolbarTitle
    })

    this.toggled = flag
  }

  toggleDeletingMode (flag) {
    if (!this.props.deletingMode) return

    const panel = window.panel
    const toolbar = panel.elements.toolbar
    const multiIcon = toolbar.elements.multiIcon
    const galleryPage = panel.elements.galleryPage

    if (flag) {
      multiIcon.changeToExit()
    } else {
      multiIcon.changeToArrow()

      const selectedPictures = this.getSelectedPictures()

      if (selectedPictures.length > 0) {
        for (var i = 0; i < selectedPictures.length; i++) {
          selectedPictures[i].select(false)
        }
      }
    }

    toolbar.toggleItemsAndButton(flag, [panel.elements.toolbarMoreIcon], panel.elements.toolbarDeleteButton)

    panel.setState({
      toolbarTitle: (flag) ? 'Zaznaczone zdjęcia (0)' : galleryPage.selectedCategory.props.data.title
    })

    this.toggledDeletingMode = flag
  }

  getSelectedPictures () {
    let pictures = []

    for (var i = 0; i < this.pictures.length; i++) {
      if (this.pictures[i].selected) {
        pictures.push(this.pictures[i])
      }
    }

    return pictures
  }

  onPictureClick = (e, picture) => {
    if (this.toggledDeletingMode && this.props.deletingMode) {
      panel.setState({
        toolbarTitle: 'Zaznaczone zdjęcia (' + this.getSelectedPictures().length + ')'
      })
    } else if (!this.props.deletingMode) {
      this.togglePicture(true, picture.props.url)
    }
  }

  selectAll () {
    if (!this.props.deletingMode) return

    this.toggleDeletingMode(true)

    for (var i = 0; i < this.pictures.length; i++) {
      this.pictures[i].select(true)
    }
  }

  /**
   * Shows or hides full screen picture.
   * @param {Boolean} show
   * @param {String} picture url
   */
  togglePicture (flag, url) {
    if (!this.props.panel) {
      const blog = window.blog
      const selectedPicture = this.elements.selectedPicture

      blog.setState({
        toolbarTransparent: flag
      })

      this.setState({
        toggledPicture: flag,
        pictureUrl: url || this.state.pictureUrl
      })

      selectedPicture.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'
      setTimeout(() => {
        selectedPicture.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
      }, (flag) ? 20 : 200)

      if (flag) {
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize)
      } else {
        window.removeEventListener('resize', this.onWindowResize)
      }

      this.toggledFullScreenPicture = flag
    }
  }

  onWindowResize = (e) => {
    const picture = this.elements.picture

    const naturalWidth = picture.width
    const naturalHeight = picture.height

    const width = naturalWidth * window.innerHeight / naturalHeight

    if (width >= window.innerWidth && !this.state.pictureVerticalPosition) {
      this.setState({
        pictureVerticalPosition: true
      })
    } else if (width < window.innerWidth && this.state.pictureVerticalPosition) {
      this.setState({
        pictureVerticalPosition: false
      })
    }
  }

  render () {
    let className = 'gallery-pictures-container'
    const pictures = this.state.pictures.length
    if (pictures >= 4) className += ' many'
    else if (pictures <= 2) className += ' count-' + pictures

    const style = {
      top: (!this.state.toggledPicture) ? 64 : 0,
      height: `calc(100% - ${(!this.state.toggledPicture) ? 64 : 0}px)`
    }

    const pictureStyle = {
      width: (!this.state.pictureVerticalPosition) ? 'auto' : '100%',
      height: (!this.state.pictureVerticalPosition) ? '100%' : 'auto'
    }

    const pictureBlurStyle = {
      backgroundImage: `url(${this.state.pictureUrl})`
    }

    return (
      <div className='gallery-pictures-dialog' ref={(e) => this.elements.root = e} style={style}>
        <div className={className}>
          {
            this.state.pictures.map((url, key) => {
              return <Picture url={url} key={key} picturesDialog={this} onClick={this.onPictureClick} />
            })
          }
        </div>
        <div className='selected-picture' ref={(e) => this.elements.selectedPicture = e}>
          <div className='gradient' />
          <div className='blur' style={pictureBlurStyle} />
          <img src={this.state.pictureUrl} className='img' style={pictureStyle} ref={(e) => this.elements.picture = e} />
        </div>
      </div>
    )
  }
}

PicturesDialog.defaultProps = {
  deletingMode: false,
  panel: false
}
