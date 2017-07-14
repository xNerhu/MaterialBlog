import Component from '../../../../../helpers/Component'
import Url from '../../../../../helpers/Url'

import Item from './components/Item'

import Preloader from '../../../../../imports/materialdesign/components/Preloader'
import MaterialButton from '../../../../../imports/materialdesign/components/MaterialButton'

export default class UploadPicturesDialog extends Component {
  beforeRender () {
    this.input = null
    this.files = []
    this.items = []
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  toggle = (flag, input) => {
    const self = this
    const root = this.getRoot()

    const app = window.app

    app.toggleFAB(!flag)

    if (flag) {
      this.input = input
      this.files = []
      this.items = []

      this.elements.container.innerHTML = ''

      this.togglePreloader(true)

      let read = 0

      for (var i = 0; i < input.files.length; i++) {
        const file = input.files[i]
        const index = this.files.length

        this.files.push({
          fileName: file.name
        })

        let reader = new FileReader()

        reader.onload = function (e) {
          const src = e.target.result

          self.files[index].src = src

          read++
          if (read >= input.files.length) {
            for (var i = 0; i < self.files.length; i++) {
              self.addItem(self.files[i].fileName)
            }

            self.togglePreloader(false)

            setTimeout(function () {
              self.startUploading()
            }, 20)
          }
        }

        reader.readAsDataURL(file)
      }
    }

    app.toggleFullScreenDialog(flag, root)
  }

  startUploading = () => {
    const self = this

    let index = 0

    function upload () {
      const item = self.items[index]
      const preloader = item.elements.preloader

      self.upload('', function (progress) {
        preloader.setProgress(progress)
      }, function () {
        item.done()
        index++

        if (index >= self.items.length) {
          console.log('done uploading')
        } else {
          upload()
        }
      })
    }

    upload()
  }

  upload = (src, onprogress, callback) => {
    let progress = 0

    const timer = setInterval(function () {
      progress += 50

      onprogress(progress)

      if (progress >= 100) {
        clearInterval(timer)
        callback()
      }
    }, 200)
  }

  addItem = (fileName) => {
    const element = (
      <Item fileName={fileName} getUploadPicturesDialog={() => { return this }} />
    )

    this.renderComponents(element, this.elements.container)
  }

  togglePreloader = (flag) => {
    this.elements.preloader.getRoot().style.display = (flag) ? 'block' : 'none'
  }

  render () {
    return (
      <div className='full-screen-dialog upload-pictures-dialog' ref='root'>
        <div className='upload-pictures-dialog-container' ref='container' />
        <Preloader className='upload-pictures-preloader' ref='preloader' />
      </div>
    )
  }
}
