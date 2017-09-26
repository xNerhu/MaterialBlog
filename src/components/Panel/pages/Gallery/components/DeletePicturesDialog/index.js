import Component from 'inferno-component'

import { deletePicture } from '../../../../../../actions/gallery'

import Dialog from '../../../../../../materialdesign/components/Dialog'
import Preloader from '../../../../../../materialdesign/components/Preloader'
import TextField from '../../../../../../materialdesign/components/TextField'

export default class DeletePicturesDialog extends Component {
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
    const picturesDialog = galleryPage.elements.picturesDialog
    const snackbar = panel.elements.deletePicturesSnackbar

    const root = this.getRoot()
    const dialog = this.elements.dialog

    root.classList.add('enabled-preloader')

    const selectedCategory = galleryPage.selectedCategory

    if (picturesDialog.toggledDeletingMode) {
      const selectedPictures = picturesDialog.getSelectedPictures()
      const selectedCategory = galleryPage.selectedCategory

      picturesDialog.toggleDeletingMode(false)

      const sections = galleryPage.state.sections.slice()
      const sectionIndex = sections.indexOf(selectedCategory.props.section.props.data)
      const categoryIndex = sections[sectionIndex].categories.indexOf(selectedCategory.props.data)

      for (var i = 0; i < selectedPictures.length; i++) {
        const url = selectedPictures[i].props.url.split('../')[1]

        const json = await deletePicture(selectedCategory.props.data._id, url)
        if (!json.success) {
          alert('Error')
          return console.error(json)
        }

        const pictureIndex = sections[sectionIndex].categories[categoryIndex].pictures.indexOf(selectedPictures[i].props.url)
        sections[sectionIndex].categories[categoryIndex].pictures.splice(pictureIndex, 1)

        selectedPictures[i].select(false)
      }

      galleryPage.setState({
        sections
      })

      dialog.toggle(false)
      snackbar.toggle(true)
      panel.moveFAB(snackbar.getRoot().scrollHeight)
      root.classList.remove('enabled-preloader')
    }
  }

  render () {
    return (
      <div className='input-dialog' ref={(e) => this.elements.root = e}>
        <Dialog title='Czy na pewno chcesz usunąć zaznaczone zdjęcia?' ref={(e) => this.elements.dialog = e} items={this.state.dialogItems}>
          <div className='text'>
            Nie będzie można tego cofnąć.
          </div>
          <Preloader />
        </Dialog>
      </div>
    )
  }
}
