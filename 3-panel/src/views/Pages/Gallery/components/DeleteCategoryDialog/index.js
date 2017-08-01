import Component from '../../../../../helpers/Component'

import Dialog from '../../../../../imports/materialdesign/components/Dialog'

import Preloader from '../../../../../imports/materialdesign/components/Preloader'

export default class AddCategoryDialog extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Sets dialog action buttons.
   */
  setDialogItems () {
    const dialog = this.elements.dialog

    const items = [
      {
        text: 'USUŃ',
        onClick: this.onDeleteButtonClick
      },
      {
        text: 'ANULUJ',
        onClick: function () {
          dialog.toggle(false)
        }
      }
    ]

    dialog.setItems(items)
  }

  /**
   * On dialog action button delete category click event.
   * @param {Event}
   */
  onDeleteButtonClick = (e) => {
    const self = this

    const root = this.getRoot()
    const dialog = this.elements.dialog

    const gallery = window.app.getGalleryPage()
    const clickedPost = gallery.clickedCategory
    const index = gallery.categoriesData.indexOf(clickedPost.props.data)

    root.classList.add('enabled-preloader')

    dialog.setItems([])

    setTimeout(function () {
      gallery.categoriesData[index].removed = true

      gallery.reloadSections()

      root.classList.remove('enabled-preloader')

      self.setDialogItems()

      dialog.toggle(false)
    }, 500)
  }

  render () {
    return (
      <div className='delete-category-dialog' ref='root'>
        <Dialog title='Czy napewno chcesz usunąć tą kategorię?' ref='dialog'>
          <div className='text'>
            Nie będzie można tego cofnąć.
          </div>
          <Preloader ref={(e) => this.preloader = e} />
        </Dialog>
      </div>
    )
  }

  afterRender () {
    this.setDialogItems()
  }
}
