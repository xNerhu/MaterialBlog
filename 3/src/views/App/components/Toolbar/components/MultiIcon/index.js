export default class MultiIcon {
  constructor () {
    this.isArrow = false
    this.isExit = false

    this.canClick = true
    this.actualState = 'default'

    this.props = {}
    this.elements = {}

    this.render()
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
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
    const self = this
    const root = this.elements.root

    if (!this.isArrow && !this.isExit) {
      root.className += ' multiIcon-exit multiIcon-exit-change'
      this.isExit = null
      // Wait until end of animation.
      setTimeout(function () {
        self.isExit = true
      }, 800)

      if (update) this.actualState = 'exit'
    }
  }

  /**
   * Change to arrow version.
   * @param {Boolean} update actual state.
   */
  changeToArrow = (update = true) => {
    const self = this
    const root = this.elements.root

    if (!this.isArrow && !this.isExit) {
      root.classList.remove('multiIcon-arrow-true')
      root.className += ' multiIcon-arrow multiIcon-arrow-change'
      this.isArrow = null
      // Wait until end of animation.
      setTimeout(function () {
        self.isArrow = true
      }, 500)

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

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'multiIcon'

    this.elements.grid1 = document.createElement('div')
    this.elements.grid1.className = 'multiIcon-grid multiIcon-grid-1'

    this.elements.grid2 = document.createElement('div')
    this.elements.grid2.className = 'multiIcon-grid multiIcon-grid-2'

    this.elements.grid3 = document.createElement('div')
    this.elements.grid3.className = 'multiIcon-grid multiIcon-grid-3'

    this.elements.root.appendChild(this.elements.grid1)
    this.elements.root.appendChild(this.elements.grid2)
    this.elements.root.appendChild(this.elements.grid3)
  }
}
