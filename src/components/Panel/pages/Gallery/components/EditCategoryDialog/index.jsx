import Component from 'inferno-component'

import { editCategory } from '../../../../../../actions/gallery'

import Dialog from '../../../../../../materialdesign/components/Dialog'
import Preloader from '../../../../../../materialdesign/components/Preloader'
import TextField from '../../../../../../materialdesign/components/TextField'

export default class EditCategoryDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      dialogItems: [
        {
          text: 'ZAPISZ',
          onClick: this.onSaveButtonClick
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

  onSaveButtonClick = async (e) => {
    const panel = window.panel
    const galleryPage = panel.elements.galleryPage
    const snackbar = panel.elements.saveCategorySnackbar

    const root = this.getRoot()
    const dialog = this.elements.dialog

    root.classList.add('enabled-preloader')

    if (this.verify()) {
      const textField = this.elements.textField

      const selectedCategory = galleryPage.selectedCategory

      const json = await editCategory(selectedCategory.props.data._id, textField.getValue())

      if (!json.success) return console.error(json)

      const sectionIndex = galleryPage.state.sections.indexOf(selectedCategory.props.section.props.data)
      const categoryIndex = galleryPage.state.sections[sectionIndex].categories.indexOf(galleryPage.selectedCategory.props.data)

      const sections = galleryPage.state.sections.slice()
      sections[sectionIndex].categories[categoryIndex].title = textField.getValue()

      galleryPage.setState({
        sections
      })

      textField.setValue('')
      dialog.toggle(false)
      snackbar.toggle(true)
      panel.moveFAB(snackbar.getRoot().scrollHeight)
    }

    root.classList.remove('enabled-preloader')
  }

  verify () {
    const textField = this.elements.textField
    const length = textField.getValue().length

    if (length < 1) return textField.toggleError(true)
    else if (length > 30) return false

    return true
  }

  show () {
    const galleryPage = window.panel.elements.galleryPage

    this.elements.textField.setValue(galleryPage.selectedCategory.props.data.title)
    this.elements.dialog.toggle(true)
  }

  render () {
    return (
      <div className='input-dialog' ref={(e) => this.elements.root = e}>
        <Dialog title='Edytowanie kategorii' ref={(e) => this.elements.dialog = e} items={this.state.dialogItems}>
          <TextField ref={(e) => this.elements.textField = e} hint='Nazwa' helperText='*Wymagane' maxLength={30} />
          <Preloader />
        </Dialog>
      </div>
    )
  }
}
