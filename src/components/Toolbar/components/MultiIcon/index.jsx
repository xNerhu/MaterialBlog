import Component from 'inferno-component'

export default class MultiIcon extends Component {
  constructor () {
    super()
    this.elements = {}

    this.canClick = true
    this.isArrow = false
    this.isExit = false

    this.actualState = 'default'
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Backs to default.
   */
  changeToDefault () {
    const root = this.getRoot()
    const classList = root.classList

    classList.remove('arrow')
    classList.remove('exit')
  }

  /**
   * Changes to arrow.
   * @param {Boolean} update actual state
   */
  changeToArrow (update) {
    this.manageClass('arrow', 'exit')

    this.isArrow = true
    if (update) this.actualState = 'arrow'
  }

  /**
   * Changes to exit.
   * @param {Boolean} update actual state
   */
  changeToExit (update) {
    this.manageClass('exit', 'arrow')

    this.isExit = true
    if (update) this.actualState = 'exit'
  }

  /**
   * Adds and removes classes.
   * @param {String} class to add
   * @param {String} class to remove
   */
  manageClass (classToAdd, classToRemove) {
    const root = this.getRoot()
    const classList = root.classList

    if (classList.contains(classToRemove)) {
      classList.remove(classToRemove)
    }

    classList.add(classToAdd)
  }

  componentDidMount () {
    const props = this.props

    if (props.className != null) {
      this.getRoot().classList.add(props.className)
    }
  }

  render () {
    return (
      <div className='multiIcon' ref={(e) => this.elements.root = e}>
        <div className='grid g-1' />
        <div className='grid g-2' />
        <div className='grid g-3' />
      </div>
    )
  }
}
