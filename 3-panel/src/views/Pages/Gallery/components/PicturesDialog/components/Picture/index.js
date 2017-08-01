import Component from '../../../../../../../helpers/Component'

export default class Picture extends Component {
  beforeRender () {
    this.selected = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * On click event.
   * @param {Event}
   */
  onClick = (e) => {
    const picturesDialog = this.props.getPicturesDialog()
    const selectedPictures = picturesDialog.selectedPictures

    if (picturesDialog.toggledDeleteMode) {
      this.selected = !this.selected
      this.select(this.selected)

      if (this.selected) {
        selectedPictures.push(this)
      } else {
        selectedPictures.splice(selectedPictures.indexOf(this), 1)
      }

      picturesDialog.updateToolbarTitle()
    }
  }

  select (flag) {
    const picturesDialog = this.props.getPicturesDialog()

    const selectContainer = this.elements.selectContainer
    const img = this.elements.img
    const icon = this.elements.icon

    const size = (flag) ? (picturesDialog.elements.container.classList.contains('vertical') ? img.clientHeight : img.clientWidth) : 0

    selectContainer.style.borderRadius = (flag) ? '0%' : '100%'

    setTimeout(function () {
      selectContainer.style.width = size + 'px'
      selectContainer.style.height = size + 'px'
    }, 10)

    icon.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      icon.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 10 : 150)
  }

  render () {
    return (
      <div className='picture' ref='root' onClick={this.onClick}>
        <img ref='img' />
        <div className='select-container' ref='selectContainer' />
        <div className='icon' ref='icon' />
      </div>
    )
  }

  afterRender () {
    const picturesDialog = this.props.getPicturesDialog()
    let isVertical = false

    if (picturesDialog.elements.container.classList.contains('count-1')) {
      isVertical = null
    }

    const root = this.getRoot()
    const img = this.elements.img

    const _img = new Image()

    _img.onload = function () {
      img.src = _img.src
      root.style.opacity = '1'

      if (isVertical == null) {
        isVertical = (img.height >= img.width)
      }

      if (isVertical) {
        picturesDialog.elements.container.classList.add('vertical')
      }
    }

    _img.onerror = function () {
      _img.onload()
    }

    _img.src = this.props.url
  }
}
