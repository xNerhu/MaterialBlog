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
    const textArea = this.elements.textarea
    const length = textArea.value.length
  //  const inputAction = this.refs.inputAction

    if (true) { //this.props.getApp().accountInfo
      textArea.style.height = 'auto'
      textArea.style.height = textArea.scrollHeight + 'px'
      /*if (length > 0) {
        inputAction.style.height = inputAction.scrollHeight + 'px'
      } else {
        inputAction.style.height = '0px'
      }*/
    } else {
    //  inputAction.style.height = '0px'
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
  }
}
