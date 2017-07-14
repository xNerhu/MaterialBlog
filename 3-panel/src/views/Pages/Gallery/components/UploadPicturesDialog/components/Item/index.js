import Component from '../../../../../../../helpers/Component'

import PreloaderDeterminate from '../../../../../../../imports/materialdesign/components/PreloaderDeterminate'

export default class Item extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  done = () => {
    const done = this.elements.done

    done.style.width = '28px'
    done.style.height = '28px'
  }

  render () {
    return (
      <div className='upload-pictures-dialog-item' ref='root' onClick={this.test}>
        <PreloaderDeterminate ref='preloader' />
        <div className='preloader-done'>
          <div className='circle' ref='done' />
        </div>
        <div className='text'>
          {
            this.props.fileName
          }
        </div>
        <div className='cancel-icon' ref='cancelIcon' />
      </div>
    )
  }

  afterRender () {
    this.props.getUploadPicturesDialog().items.push(this)
  }
}
