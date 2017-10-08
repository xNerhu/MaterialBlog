import Component from 'inferno-component'

import { addCategory } from '../../../../../../actions/gallery'

import Dialog from '../../../../../../materialdesign/components/Dialog'
import Preloader from '../../../../../../materialdesign/components/Preloader'
import TextField from '../../../../../../materialdesign/components/TextField'

export default class AddCategoryDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      dialogItems: [
        {
          text: 'DODAJ',
          onClick: this.onAddButtonClick
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

  onAddButtonClick = async (e) => {
    const panel = window.panel
    const galleryPage = panel.elements.galleryPage
    const snackbar = panel.elements.addCategorySnackbar

    const root = this.getRoot()
    const dialog = this.elements.dialog

    root.classList.add('enabled-preloader')

    if (this.verify()) {
      const textField = this.elements.textField

      const json = await addCategory(textField.getValue())

      if (!json.success) return console.error(json)

      const category = {
        _id: json.data._id,
        title: textField.getValue(),
        pictures: []
      }

      let sections = galleryPage.state.sections.slice()
      const date = new Date()
      const actualYear = date.getFullYear()
      const actualMonth = date.getMonth()

      let firstSection = sections[0]

      if (firstSection != null) {
        firstSection = (firstSection.year === actualYear && firstSection.month === actualMonth)
      }

      if (firstSection) {
        sections[0].categories = [category, ...sections[0].categories]
      } else {
        const section = {
          subheader: 'Ten miesiąc',
          year: actualYear,
          month: actualMonth,
          categories: []
        }

        section.categories.push(category)

        sections = [section, ...sections]
      }


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

  render () {
    return (
      <div className='input-dialog' ref={(e) => this.elements.root = e}>
        <Dialog title='Dodaj nową kategorię' ref={(e) => this.elements.dialog = e} items={this.state.dialogItems}>
          <TextField ref={(e) => this.elements.textField = e} hint='Nazwa' helperText='*Wymagane' maxLength={30} />
          <Preloader />
        </Dialog>
      </div>
    )
  }
}
