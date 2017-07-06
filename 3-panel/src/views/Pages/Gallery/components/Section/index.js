import Component from '../../../../../helpers/Component'

import SubHeader from './components/SubHeader'
import Category from './components/Category'

export default class Section extends Component {
  beforeRender () {
    this.loadedCategories = 0
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Sets categories.
   */
  setCategories () {
    const data = this.props.data

    for (var i = 0; i < data.length; i++) {
      this.addCategory(data[i])
    }
  }

  /**
   * Adds category.
   * @param {Object} category data
   */
  addCategory (data) {
    const category = (
      <Category data={data} onLoad={this.onCategoryLoad} />
    )

    this.renderComponents(category, this.elements.container)
  }

  /**
   * On category load.
   */
  onCategoryLoad = () => {
    this.loadedCategories++

    if (this.loadedCategories >= this.props.data.length) {
      const onLoad = this.props.onLoad

      if (typeof onLoad === 'function') onLoad()
    }
  }

  render () {
    return (
      <div className='page-gallery-section' ref='root'>
        <SubHeader text={this.props.subHeader} />
        <div className='category-container' ref='container' />
      </div>
    )
  }

  afterRender () {
    this.setCategories()
  }
}
