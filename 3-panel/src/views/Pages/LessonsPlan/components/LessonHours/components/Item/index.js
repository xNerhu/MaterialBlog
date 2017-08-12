import Component from '../../../../../../../helpers/Component'

import TextField from '../../../../../../../imports/materialdesign/components/TextField'

export default class Item extends Component {

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  render () {
    return (
      <div className='item'>
        <TextField ref='start' type='datetime' />
        <TextField ref='finish' type='number' />
      </div>
    )
  }

  afterRender () {
    this.props.getLessonHours().items.push(this)
  }
}
