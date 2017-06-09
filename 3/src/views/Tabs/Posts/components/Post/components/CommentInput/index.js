import MaterialButton from '../../../../../../../imports/materialdesign/components/MaterialButton'

export default class CommentInput {
  constructor (data) {
    this.elements = {}

    this.touched = false

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
   * On textarea input event.
   * Hides or shows add comment button.
   */
  onInput = () => {
    const app = window.app
    const textarea = this.elements.textarea
    const length = textarea.value.length
    const action = this.elements.action

    if (app.accountInfo) {
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'

      if (length > 0) {
        action.style.height = action.scrollHeight + 'px'
      } else {
        action.style.height = '0px'
      }
    } else {
      action.style.height = '0px'
    }
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.className = 'post-comment-input'

    // TEXT AREA
    this.elements.textarea = document.createElement('textarea')
    this.elements.textarea.className = 'post-comment-input-textarea'
    this.elements.textarea.setAttribute('placeholder', 'Zaloguj się, by móc dodawać komentarze')
    this.elements.textarea.addEventListener('input', this.onInput)
    this.elements.root.appendChild(this.elements.textarea)

    // ACTION
    this.elements.action = document.createElement('div')
    this.elements.action.className = 'post-comments-input-action'
    this.elements.root.appendChild(this.elements.action)

    // BUTTON
    this.elements.button = new MaterialButton('DODAJ', false, 'post-comments-input-action-button')
    this.elements.button.props.rippleStyle = {
      backgroundColor: '#2196f3',
      opacity: 0.3
    }

    this.elements.action.appendChild(this.elements.button.getRoot())
  }
}
