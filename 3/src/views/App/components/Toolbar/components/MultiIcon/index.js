export default class MultiIcon {
  constructor () {
    this.onClick = this.onClick.bind(this)

    this.isArrow = false
    this.isExit = false
    this.canClick = true
    this.actualState = 'default'

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
   * On click
   * @param {Object} event data
   */
  onClick = (e) => {
    // If click mouse event has't been blocked.
    if (this.canClick && typeof this.canClick === 'function') {
      this.onClick(e)
    }
  }

  /**
   * Change to exit (X) version
   * @param {Boolean} update actual state.
   */
  changeToExit = (update = true) => {
    const self = this
    const root = this.elements.root

    if (!this.isArrow && !this.isExit) {
      this.blockClick()
      root.className += ' multiIcon-exit multiIcon-exit-change'
      this.isExit = null
      // Wait until end of animation.
      setTimeout(function () {
        self.isExit = true
      }, 500)

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
      this.blockClick()
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
      this.blockClick()
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
      this.blockClick()
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

  /**
   * Blocks click mouse event.
   */
  blockClick = () => {
    const self = this

    // Block click mouse event.
    this.canClick = false
    // Wait 1.5 second then unlock click mouse event.
    setTimeout(function () {
      self.canClick = true
    }, 1500)
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.setAttributes({
      class: 'multiIcon'
    })

    this.elements.grid1 = document.createElement('div')
    this.elements.grid1.setAttributes({
      class: 'multiIcon-grid multiIcon-grid-1'
    })

    this.elements.grid2 = document.createElement('div')
    this.elements.grid2.setAttributes({
      class: 'multiIcon-grid multiIcon-grid-2'
    })

    this.elements.grid3 = document.createElement('div')
    this.elements.grid3.setAttributes({
      class: 'multiIcon-grid multiIcon-grid-3'
    })

    this.elements.root.appendChild(this.elements.grid1)
    this.elements.root.appendChild(this.elements.grid2)
    this.elements.root.appendChild(this.elements.grid3)

    this.elements.root.addEventListener('click', this.onClick)
  }
}
