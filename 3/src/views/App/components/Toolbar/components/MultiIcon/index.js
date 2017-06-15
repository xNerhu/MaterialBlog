import Component from '../../../../../../helpers/Component'

export default class MultiIcon extends Component {
  beforeRender () {
    this.isArrow = false
    this.isExit = false

    this.canClick = true
    this.actualState = 'default'
  }

  /**
   * Blocks click mouse event.
   */
  blockClick = () => {
    const self = this

    // Block click mouse event.
    this.canClick = false
    // Wait a second then unlock click mouse event.
    setTimeout(function () {
      self.canClick = true
    }, 1000)
  }

  /**
   * Change to exit (X) version
   * @param {Boolean} update actual state.
   */
  changeToExit = (update = true) => {
    const root = this.elements.root

    if (!this.isArrow && !this.isExit) {
      root.className += ' multiIcon-exit multiIcon-exit-change'

      this.isExit = true
      if (update) this.actualState = 'exit'
    }
  }

  /**
   * Change to arrow version.
   * @param {Boolean} update actual state.
   */
  changeToArrow = (update = true) => {
    const root = this.elements.root

    if (!this.isArrow && !this.isExit) {
      root.classList.remove('multiIcon-arrow-true')
      root.className += ' multiIcon-arrow multiIcon-arrow-change'
      this.isArrow = true

      if (update) this.actualState = 'arrow'
    }
  }

  /**
   * Change to normal menu.
   * @param {Boolean} update last state.
   */
  changeToDefault = (update = true) => {
    const self = this
    const root = this.elements.root

    if (this.isArrow && !this.isExit) {
      root.className += ' multiIcon-arrow multiIcon-arrow-backtodefault'
      root.classList.remove('multiIcon-arrow')
      root.classList.remove('multiIcon-arrow-change')
      this.isArrow = null
      // Wait until end of animation.
      setTimeout(function () {
        root.classList.remove('multiIcon-arrow-backtodefault')
        self.isArrow = false
      }, 500)

      if (update) this.actualState = 'default'
    } else if (!this.isArrow && this.isExit) {
      root.classList.remove('multiIcon-exit')
      root.classList.remove('multiIcon-exit-change')
      this.isExit = null
      // Wait until end of animation.
      setTimeout(function () {
        root.classList.remove('multiIcon-exit-backtodefault')
        self.isExit = false
      }, 500)

      if (update) this.actualState = 'default'
    }
  }

  render () {
    return (
      <div className='multiIcon' ref='root' style={this.props.style}>
        <div className='multiIcon-grid multiIcon-grid-1' ref='grid1' />
        <div className='multiIcon-grid multiIcon-grid-2' ref='grid2' />
        <div className='multiIcon-grid multiIcon-grid-3' ref='grid3' />
      </div>
    )
  }
}
