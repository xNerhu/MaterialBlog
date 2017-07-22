import Component from '../../../../../../../helpers/Component'

export default class SubHeader extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  render () {
    return (
      <div className='page-gallery-sub-header' ref='root'>
        {
          this.props.text
        }
      </div>
    )
  }
}
