import Component from '../../../../../helpers/Component'

import SubHeader from './components/SubHeader'
import Category from './components/Category'

export default class Section extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  render () {
    return (
      <div className='page-gallery-section' ref='root'>
        <SubHeader text='Lipiec' />
        <div className='category-container'>
          <Category />
          <Category />
        </div>
      </div>
    )
  }
}
