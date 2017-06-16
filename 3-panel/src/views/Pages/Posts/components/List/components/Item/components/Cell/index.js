import Component from '../../../../../../../../../helpers/Component'

import Checkbox from '../../../../../../../../../imports/materialdesign/components/CheckBox'

export default class Cell extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Sets text.
   */
  setText = (str) => {
    this.elements.text.innerHTML = str
  }

  render () {
    return (
      <div className='cell' ref='root'>
        <div className='title'>
          {
            this.props.title
          }
        </div>
        <div className='text' ref='text' />
      </div>
    )
  }

  afterRender () {
    const props = this.props
    const root = this.getRoot()

    if (props.className != null) root.classList.add(props.className)
    if (props.isCheckBox) {
      const checkBox = (
        <Checkbox ref='checkbox' />
      )

      this.renderComponents(checkBox, this.elements.text)
      root.classList.add('checkbox')

      this.props.getMobileTable().cells.push(this)
      this.props.getMobileTable().checkbox = this.elements.checkBox
    }
  }
}
