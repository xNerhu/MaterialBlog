import Component from 'inferno-component'

import { deleteCategory } from '../../../../../../actions/gallery'

import Dialog from '../../../../../../materialdesign/components/Dialog'
import Preloader from '../../../../../../materialdesign/components/Preloader'
import TextField from '../../../../../../materialdesign/components/TextField'

export default class DeleteCategoryDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      dialogItems: [
        {
          text: 'USUŃ',
          onClick: this.onDeleteButtonClick
        },
        {
          text: 'ANULUJ',
          onClick: this.onCancelButtonClick
        }
      ]
    }
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  onCancelButtonClick = (e) => {
    this.elements.dialog.toggle(false)
  }

  onDeleteButtonClick = async (e) => {
    const panel = window.panel
    const galleryPage = panel.elements.galleryPage
    const snackbar = panel.elements.deleteCategorySnackbar

    const root = this.getRoot()
    const dialog = this.elements.dialog

    root.classList.add('enabled-preloader')

    const selectedCategory = galleryPage.selectedCategory

    const json = await deleteCategory(selectedCategory.props.data._id)

    if (!json.success) return console.error(json)

    const sectionIndex = galleryPage.state.sections.indexOf(selectedCategory.props.section.props.data)
    const categoryIndex = galleryPage.state.sections[sectionIndex].categories.indexOf(selectedCategory.props.data)

    const sections = galleryPage.state.sections.slice()
    sections[sectionIndex].categories.splice(categoryIndex, 1)

    if (sections[sectionIndex].categories.length < 1) {
      sections.splice(sectionIndex, 1)
    }

    galleryPage.setState({
      sections
    })

    dialog.toggle(false)
    snackbar.toggle(true)
    panel.moveFAB(snackbar.getRoot().scrollHeight)
    root.classList.remove('enabled-preloader')
  }

  render () {
    return (
      <div className='input-dialog' ref={(e) => this.elements.root = e}>
        <Dialog title='Czy na pewno chcesz usunąć tą kategorię?' ref={(e) => this.elements.dialog = e} items={this.state.dialogItems}>
          <div className='text'>
            Nie będzie można tego cofnąć.
          </div>
          <Preloader />
        </Dialog>
      </div>
    )
  }
}
