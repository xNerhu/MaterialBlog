import Component from '../../../../../../../helpers/Component'

export default class Category extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  render () {
    return (
      <div className='page-gallery-category' ref='root'>
        <div className='title'>
          aha
          <div className='menu-icon' />
        </div>
      </div>
    )
  }
}
