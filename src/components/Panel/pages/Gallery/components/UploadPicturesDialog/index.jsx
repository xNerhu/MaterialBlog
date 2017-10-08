import Component from 'inferno-component'

import { uploadPicture } from '../../../../../../actions/gallery'

import Item from './components/Item'

export default class PicturesDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      items: []
    }

    this.uploaded = 0
    this.picturesUrl = []
    this.toggled = false
  }

  toggle (flag) {
    const uploadInput = this.elements.uploadInput
    if (uploadInput.value === '') return uploadInput.click()

    const root = this.elements.root

    root.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(() => {
      root.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 200)

    this.toggled = flag

    if (flag) {
      this.uploaded = 0
      this.onInputChange()
    }
  }

  onInputChange = (e) => {
    if (!this.toggled) {
      this.toggle(true)
    } else {
      const input = this.elements.uploadInput
      const files = input.files

      let items = []

      for (var i = 0; i < files.length; i++) {
        const file = files[i]

        if (file.type.includes('image')) {
          items.push({
            fileName: file.name,
            done: false,
            uploading: false,
            canceled: false
          })
        } else {
          console.error('File is not an image!', file)
        }
      }

      this.setState({
        items
      })

      this.upload()
    }
  }

  upload () {
    const galleryPage = window.panel.elements.galleryPage
    const selectedCategory = galleryPage.selectedCategory

    const uploadInput = this.elements.uploadInput

    if (this.uploaded < this.state.items.length) {
      if (this.state.items[this.uploaded].canceled) {
        this.uploaded++
        return this.upload()
      }

      const files = uploadInput.files

      let reader = new FileReader()

      const items = this.state.items
      items[this.uploaded].uploading = true

      this.setState({
        items
      })

      reader.onload = async (e) => {
        const base64 = e.target.result

        const json = await uploadPicture(selectedCategory.props.data._id, base64)
        if (!json.success) {
          alert('Error')
          return console.error(json)
        }

        this.picturesUrl.push('../' + json.data.url)
        items[this.uploaded].done = true

        this.setState({
          items
        })

        this.uploaded++
        this.upload()
      }

      reader.readAsDataURL(files[this.uploaded])
    } else {
      const picturesDialog = galleryPage.elements.picturesDialog
      const sections = galleryPage.state.sections.slice()
      const sectionIndex = sections.indexOf(selectedCategory.props.section.props.data)
      const categoryIndex = sections[sectionIndex].categories.indexOf(selectedCategory.props.data)
      const pictures = sections[sectionIndex].categories[categoryIndex].pictures

      sections[sectionIndex].categories[categoryIndex].pictures = pictures.concat(this.picturesUrl)

      galleryPage.setState({
        sections
      })

      if (picturesDialog.toggled) {
        picturesDialog.setState({
          pictures: sections[sectionIndex].categories[categoryIndex].pictures
        })
      }

      this.toggle(false)
      this.setState({
        items: []
      })
      this.picturesUrl = []
      this.uploaded = 0
      uploadInput.value = ''
    }
  }

  render () {
    return (
      <div className='gallery-upload-pictures-dialog' ref={(e) => this.elements.root = e}>
        <div className='items-container'>
          {
            this.state.items.map((data, key) => {
              return <Item data={data} dialog={this} />
            })
          }
        </div>
        <input className='upload-input' ref={(e) => this.elements.uploadInput = e} type='file' name='pic' accept='image/*' onChange={this.onInputChange} multiple='true' />
      </div>
    )
  }
}
