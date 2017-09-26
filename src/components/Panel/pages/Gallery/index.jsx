import Component from 'inferno-component'
import GallerySection from '../../../../utils/GallerySection'

import { getCategories } from '../../../../actions/gallery'

import PicturesDialog from '../../../PicturesDialog'
import UploadPicturesDialog from './components/UploadPicturesDialog'
import Section from '../../../Section'

export default class Gallery extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      sections: []
    }

    this.months = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień'
    ]

    this.selectedCategory = null
  }

  async load () {
    const panel = window.panel
    let categories = await getCategories()

    if (categories.success === false) return console.error(categories)

    for (var i = 0; i < categories.length; i++) {
      for (var p = 0; p < categories[i].pictures.length; p++) {
        categories[i].pictures[p] = '../' + categories[i].pictures[p]
      }
    }

    let pictures = []

    for (var i = 0; i < categories.length; i++) {
      pictures.push(categories[i].pictures[categories[i].pictures.length - 1])
    }

    // Load thumbnails
    await loadPictures(pictures)

    const sections = GallerySection.get(categories)

    this.setState({
      sections
    })

    panel.togglePreloader(false)
    panel.toggleFAB(true)
    this.elements.sectionsContainer.style.opacity = '1'
  }

  onCategoryClick = (e, category) => {
    this.selectedCategory = category
    this.elements.picturesDialog.toggle(true, category.props.data)
  }

  render () {
    return (
      <div className='panel-page gallery'>
        <div className='sections-container' ref={(e) => this.elements.sectionsContainer = e}>
          {
            this.state.sections.map((section, key) => {
              return <Section data={section} key={key} onCategoryClick={this.onCategoryClick} galleryPage={this} categoryMenuIcon={true} />
            })
          }
        </div>
        <PicturesDialog ref={(e) => this.elements.picturesDialog = e} deletingMode={true} component={this} panel={true} />
        <UploadPicturesDialog ref={(e) => this.elements.uploadPicturesDialog = e} />
      </div>
    )
  }

  componentDidMount () {
    const panel = window.panel
    const title = 'Galeria'

    panel.defaultToolbarTitle = title
    panel.setState({
      toolbarTitle: title
    })

    panel.elements.galleryPage = this
  }
}
