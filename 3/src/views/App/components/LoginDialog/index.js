import Component from '../../../../helpers/Component'

import Dialog from '../../../../imports/materialdesign/components/Dialog'
import Preloader from '../../../../imports/materialdesign/components/Preloader'
import TextField from '../../../../imports/materialdesign/components/TextField'

export default class LoginDialog extends Component {
  beforeRender () {
    this.isPasswordType = true

    this.isLoginError = false
    this.isPasswordError = false
  }

  /**
   * Gets root.
   * @return {DOMElement} root.
   */
  getRoot = () => {
    return this.elements.root
  }

  /**
   * Shows dialog.
   */
  show = () => {
    const app = window.app
    const navigationDrawer = app.getNavigationDrawer()
    const root = this.getRoot()

    if (navigationDrawer.toggled) navigationDrawer.hide()
    root.toggle(true)
  }

  /**
   * On password input action icon click event.
   * Changes password visibility.
   * @param {Event}
   */
  onActionIconClick = (e) => {
    const textField = this.elements.passwordTextField
    const textFieldRoot = textField.getRoot()
    const textFieldInput = textField.getInput()

    this.isPasswordType = !this.isPasswordType

    textFieldInput.type = (this.isPasswordType) ? 'password' : 'text'

    if (this.isPasswordType) {
      textFieldRoot.classList.remove('visible')
    } else {
      textFieldRoot.classList.add('visible')
    }
  }

  onLoginClick = () => {
    const loginTextField = this.elements.loginTextField
    const passwordTextField = this.elements.passwordTextField

    const login = loginTextField.getInput().value
    const password = passwordTextField.getInput().value

    if (login.length < 1) {
      loginTextField.toggleError(true)
      this.isLoginError = true
    }

    if (password.length < 1) {
      passwordTextField.toggleError(true)
    }

    if (login.length > 0 && password.length > 0) {
      const root = this.getRoot()
      const form = this.elements.form
      const dialogContent = this.getRoot().elements.content
      const preloader = this.elements.preloader
      const app = window.app
      const snackbarLogged = app.elements.snackbarLogged

      dialogContent.style.height = dialogContent.scrollHeight - 20 + 'px'

      form.style.opacity = '0'

      setTimeout(function () {
        form.style.display = 'none'
      }, 300)

      preloader.style.display = 'block'

      root.elements.title.innerHTML = 'Logowanie'
      root.setItems(this.logingItems)

      // TODO: Make reqeust.
      setTimeout(function () {
        root.toggle(false)

        snackbarLogged.toggle(true)
      }, 1000)
    }
  }

  /**
   * On login input or blur event.
   */
  onLoginInput = () => {
    const textField = this.elements.loginTextField
    const input = textField.getInput()

    if (input.value.length < 1 && !this.isLoginError) {
      textField.toggleError(true)
      this.isLoginError = true
    } else if (input.value.length > 0 && this.isLoginError) {
      textField.toggleError(false)
      this.isLoginError = false
    }
  }

  /**
   * On password input or blur event.
   */
  onPasswordInput = () => {
    const textField = this.elements.passwordTextField
    const input = textField.getInput()

    if (input.value.length < 1 && !this.isPasswordError) {
      textField.toggleError(true)
      this.isPasswordError = true
    } else if (input.value.length > 0 && this.isPasswordError) {
      textField.toggleError(false)
      this.isPasswordError = false
    }
  }

  /**
   * Cancels loging.
   */
  cancelLoging = () => {

  }

  render () {
    return (
      <Dialog className='login-dialog' title='Zaloguj się' ref='root'>
        <div className='login-dialog-form' ref={(e) => this.elements.form = e}>
          <TextField ref={(e) => this.elements.loginTextField = e} hint='Login/E-mail' helperText='*Wymagane' />
          <TextField ref={(e) => this.elements.passwordTextField = e} className='login-dialog-password' hint='Hasło' helperText='*Wymagane' type='password' onActionIconClick={this.onActionIconClick} />
        </div>
        <div className='login-dialog-preloader-container' ref={(e) => this.elements.preloader = e}>
          <Preloader />
        </div>
      </Dialog>
    )
  }

  afterRender () {
    const self = this
    const root = this.getRoot()

    const loginTextField = this.elements.loginTextField
    const loginTextFieldInput = loginTextField.getInput()

    const passwordTextField = this.elements.passwordTextField
    const passwordTextFieldInput = passwordTextField.getInput()

    this.defaultItems = [
      {
        text: 'ZALOGUJ',
        onClick: self.onLoginClick
      },
      {
        text: 'ANULUJ',
        onClick: function () {
          root.toggle(false)
        }
      }
    ]

    this.logingItems = [
      {
        text: 'ANULUJ',
        onClick: self.cancelLoging
      }
    ]

    root.setItems(this.defaultItems)

    loginTextFieldInput.addEventListener('input', this.onLoginInput)
    loginTextFieldInput.addEventListener('blur', this.onLoginInput)

    passwordTextFieldInput.addEventListener('input', this.onPasswordInput)
    passwordTextFieldInput.addEventListener('blur', this.onPasswordInput)
  }
}
