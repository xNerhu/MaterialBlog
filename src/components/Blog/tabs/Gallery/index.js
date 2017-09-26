import Component from 'inferno-component'

import { getCategories } from '../../../../actions/gallery'

import GallerySection from '../../../../utils/GallerySection'
import PicturesDialog from '../../../PicturesDialog'
import Section from '../../../Section'
import Category from '../../../Category'

export default class GalleryTab extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      left: 100,
      sections: []
    }
  }

  async load () {
    const blog = window.blog

    const json = await getCategories()
    if (json.success === false) return console.error(json)

    let pictures = []

    for (var i = 0; i < json.length; i++) {
      pictures.push(json[i].pictures[json[i].pictures.length - 1])
    }

    // Load thumbnails
    await loadPictures(pictures)

    const sections = GallerySection.get(json)

    this.setState({
      sections: sections
    })

    blog.togglePreloader(false)
    blog.getTabLayout().isLoading = false
    this.elements.sectionsContainer.style.opacity = '1'
  }

  onCategoryClick = (e, category) => {
    this.elements.picturesDialog.toggle(true, category.props.data)
  }

  render () {
    const style = {
      left: this.state.left + '%'
    }

    return (
      <div className='tab-page gallery' ref={(e) => this.elements.root = e} style={style}>
        <div className='sections-container' ref={(e) => this.elements.sectionsContainer = e}>
          {
            this.state.sections.map((data, key) => {
              return <Section data={data} key={key} categoryMenuIcon={false} onCategoryClick={this.onCategoryClick} />
            })
          }
        </div>
        <PicturesDialog ref={(e) => this.elements.picturesDialog = e} deletingMode={false} component={this} />
      </div>
    )
  }

  componentDidMount () {
    window.blog.tabs.push(this)
  }
}
