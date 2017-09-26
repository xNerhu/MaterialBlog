import Component from 'inferno-component'

import MaterialButton from '../../../../materialdesign/components/MaterialButton'

export default class ToolbarButton extends Component {
  constructor () {
    super()
    this.elements = {}

    this.touched = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  render () {
    return (
      <div className='toolbar-button toolbar-right' ref={(e) => this.elements.root = e}>
        <MaterialButton ref={(e) => this.elements.button = e} shadow={false} rippleStyle={this.props.rippleStyle} text={this.props.text} onClick={this.props.onClick} />
      </div>
    )
  }

  componentDidMount () {
    const props = this.props

    if (props.className != null) this.getRoot().classList.add(props.className)
  }
}

ToolbarButton.defaultProps = {
  rippleStyle: {
    backgroundColor: '#fff',
    opacity: 0.2
  }
}
