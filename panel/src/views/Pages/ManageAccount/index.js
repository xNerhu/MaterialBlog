import Component from '../../../helpers/Component'

import TextField from '../../../imports/materialdesign/components/TextField'
import MaterialButton from '../../../imports/materialdesign/components/MaterialButton'
import Preloader from '../../../imports/materialdesign/components/Preloader'

export default class ManageAccountPage extends Component {
  beforeRender () {
    this.pageData = {
      title: 'Zarządzaj kontem',
      url: 'manageaccount',
      loaded: false
    }

    this.isEdited = false
    this.avatar = null
    this.canShowButtons = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  /**
   * Loads categories.
   */
  load () {
    const self = this

    const app = window.app

    setTimeout(function () {
      app.togglePreloader(false)
      app.pagesData.loading = false
      self.canShowButtons = true
    }, 10)
  }

  /**
   * On user logs event.
   */
  onUserLog () {
    this.setForm()
  }

  setForm () {
    const app = window.app
    const accountInfo = app.accountInfo

    this.avatar = accountInfo.avatar
    this.elements.avatar.style.backgroundImage = 'url(' + accountInfo.avatar + ')'
    this.elements.login.setValue(accountInfo.login)
    this.elements.name.setValue(accountInfo.userName)
    this.elements.email.setValue(accountInfo.email)
    this.elements.password.setValue('')
    this.elements.passwordVerify.setValue('')
  }

  onTextFieldInput = (e, textField) => {
    if (this.canShowButtons) {
      this.isEdited = true
      this.toggleButtons(true)
    }

    if (textField.error) textField.toggleError(false)
  }

  /**
   * Shows or hides action buttons. (save and cancel)
   * @param {Boolean}
   */
  toggleButtons (flag) {
    const buttonsContainer = this.elements.buttonsContainer

    buttonsContainer.style.height = ((flag) ? buttonsContainer.scrollHeight : 0) + 'px'
  }

  /**
   * Shows or hides preloader.
   * @param {Boolean}
   */
  togglePreloader (flag) {
    const container = this.elements.preloaderContainer

    container.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      container.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 300)
  }

  /**
   * On save button click.
   * Saves settings.
   * @param {Event}
   */
  onSaveButtonClick = (e) => {
    const self = this

    const app = window.app

    this.canShowButtons = false

    if (this.verifyData()) {
      this.toggleButtons(false)
      this.togglePreloader(true)

      app.accountInfo.avatar = this.avatar
      app.accountInfo.login = this.elements.login.getValue()
      app.accountInfo.userName = this.elements.name.getValue()
      app.accountInfo.email = this.elements.email.getValue()

      setTimeout(function () {
        self.togglePreloader(false)
        self.canShowButtons = true
      }, 1000)
    }
  }

  /**
   * On cancel button click.
   * Backs settings.
   * @param {Event}
   */
  onCancelButtonClick = (e) => {
    this.setForm()
    this.toggleButtons(false)
  }

  verifyData () {
    const textFields = [
      this.elements.login,
      this.elements.name,
      this.elements.email
    ]

    let correct = true

    for (var i = 0; i < textFields.length; i++) {
      if (!this.verifyTextField(textFields[i])) correct = false
    }

    const password = this.elements.password.getValue()
    const passwordVerifyTextField = this.elements.passwordVerify
    const passwordVerify = passwordVerifyTextField.getValue()

    if (password.length >= 1) {
      if (password !== passwordVerify) {
        passwordVerifyTextField.toggleError(true)
        return false
      }
    }

    return correct
  }

  verifyTextField (textField) {
    if (textField.getValue().length < 1) {
      textField.toggleError(true)
      return false
    }

    return true
  }

  /**
   * On avatar click.
   * Triggers file input dialog.
   * @param {Event}
   */
  onAvatarClick = (e) => {
    this.elements.input.click()
  }

  onInputChange = (e) => {
    const self = this

    let reader = new FileReader()

    reader.onload = function (readerEventData) {
      const src = readerEventData.target.result

      self.avatar = src
      self.elements.avatar.style.backgroundImage = 'url(' + src + ')'
      self.toggleButtons(true)
    }

    reader.readAsDataURL(e.target.files[0])
  }

  render () {
    return (
      <div className='page page-manage-account' ref='root'>
        <div className='page-manage-account-container'>
          <div className='section avatar'>
            <div className='title'>
              Avatar
            </div>
            <div className='control'>
              <div className='avatar' ref='avatar' onClick={this.onAvatarClick} />
            </div>
          </div>
          <div className='section login'>
            <div className='title'>
              Login
            </div>
            <div className='control'>
              <TextField ref='login' onInput={this.onTextFieldInput} />
            </div>
          </div>
          <div className='section name'>
            <div className='title'>
              Imię i Nazwisko
            </div>
            <div className='control'>
              <TextField ref='name' onInput={this.onTextFieldInput} />
            </div>
          </div>
          <div className='section email'>
            <div className='title'>
              E-Mail
            </div>
            <div className='control'>
              <TextField ref='email' onInput={this.onTextFieldInput} />
            </div>
          </div>
          <div className='section password'>
            <div className='title'>
              Hasło
            </div>
            <div className='control'>
              <TextField ref='password' type='password' onInput={this.onTextFieldInput} />
            </div>
          </div>
          <div className='section password-verify'>
            <div className='title'>
              Powtórz hasło
            </div>
            <div className='control'>
              <TextField ref='passwordVerify' type='password' onInput={this.onTextFieldInput} />
            </div>
          </div>
          <div className='buttons-container' ref='buttonsContainer'>
            <MaterialButton text='ZAPISZ' onClick={this.onSaveButtonClick} shadow={false} rippleStyle={{
              backgroundColor: '#3f51b5',
              opacity: 0.2
            }} />
            <MaterialButton className='cancel' onClick={this.onCancelButtonClick} text='ANULUJ' shadow={false} rippleStyle={{
              backgroundColor: '#000',
              opacity: 0.2
            }} />
          </div>
          <div className='preloader-container' ref='preloaderContainer'>
            <Preloader />
          </div>
        </div>
        <input className='avatar-input' ref='input' type='file' name='pic' accept='image/*' onChange={this.onInputChange} />
      </div>
    )
  }

  afterRender () {
    window.app.elementsToCall.push(this)
  }
}
