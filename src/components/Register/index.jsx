import Component from 'inferno-component'
import Url from 'url'

import { register } from '../../actions/auth'

import Preloader from '../../materialdesign/components/Preloader'
import TextField from '../../materialdesign/components/TextField'
import MaterialButton from '../../materialdesign/components/MaterialButton'
import Checkbox from '../../materialdesign/components/CheckBox'

export default class Register extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      overflowHidden: false,
      preloader: false,
      avatar: 'images/default-avatar.png',
      loginTextFieldHelperTextExists: false,
      emailTextFieldHelperTextExists: false
    }

    this.touched = false
  }

  /**
   * On text field input.
   * Disables error if toggled.
   * @param {Event}
   * @param {TextField}
   */
  onTextFieldInput = (e, textfield) => {
    if (textfield.error) textfield.toggleError(false)

    this.setState({
      loginTextFieldHelperTextExists: false,
      emailTextFieldHelperTextExists: false
    })
  }

  /**
   * On password text field input.
   * Fixes chrome's bug with login inputs.
   * @param {Event}
   * @param {TextField}
   */
  onPasswordTextFieldInput = (e, textfield) => {
    textfield.getInput().setAttribute('type', 'password')
    this.onTextFieldInput(e, textfield)
  }

  /**
   * Shows or hides preloader.
   * @param {Boolean}
   */
  togglePreloader (flag) {
    this.setState({
      overflowHidden: flag,
      preloader: flag
    })
  }

  onRegisterButtonClick = async (e) => {
    if (this.validate()) {
      this.togglePreloader(true)
      const textFields = this.getTextFields()

      const json = await register(textFields.login.getValue(), textFields.username.getValue(), textFields.email.getValue(), this.state.avatar, textFields.password.getValue(), textFields.passwordVerify.getValue(), this.elements.checkbox.checked)

      this.togglePreloader(false)

      if (!json.success) {
        if (json.message === 'login_exists') {
          this.setState({
            loginTextFieldHelperTextExists: true
          })

          textFields.login.toggleError(true)
        } else if (json.message === 'email_exists') {
          this.setState({
            emailTextFieldHelperTextExists: true
          })

          textFields.email.toggleError(true)
        }

        alert(json)
        return console.log(json)
      }

      if (json.success) {
        window.app.getBrowserHistory().push('/login?backtoblog=true')
      }
    }
  }

  /**
   * Validates form.
   * @return {Boolean} correct
   */
  validate () {
    const textFields = this.getTextFields()
    let isError = false

    // If login field is invalid
    if (textFields.login.getValue().length < 4) {
      textFields.login.toggleError(true)
      isError = true
    }
    // If username field is invalid
    if (textFields.username.getValue().length < 5) {
      textFields.username.toggleError(true)
      isError = true
    }
    // If email field is invalid
    const email = textFields.email.getValue()
    if (email.length < 5 || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      textFields.email.toggleError(true)
      isError = true
    }
    // If password field is invalid
    if (textFields.password.getValue().length < 4) {
      textFields.password.toggleError(true)
      isError = true
    }
    // If password-verify field is invalid
    if (textFields.passwordVerify.getValue().length < 4) {
      textFields.passwordVerify.toggleError(true)
      isError = true
    }
    // If passwords are not same
    if (textFields.password.getValue() !== textFields.passwordVerify.getValue()) {
      textFields.passwordVerify.toggleError(true)
      isError = true
    }

    return !isError
  }

  /**
   * Gets all textfields in form.
   * @return {Object}
   */
  getTextFields () {
    return {
      login: this.elements.loginTextField,
      username: this.elements.userNameTextField,
      email: this.elements.emailTextField,
      password: this.elements.passwordTextField,
      passwordVerify: this.elements.passwordVerifyTextField
    }
  }

  /**
   * On avatar input change.
   * @param {Event}
   */
  onAvatarInputChange = (e) => {
    const reader = new FileReader()

    // Get base64 of image
    reader.onload = (readerEventData) => {
      const src = readerEventData.target.result

      // Update avatar
      this.setState({
        avatar: src
      })
      // Reset input value
      e.target.value = ''
    }

    reader.readAsDataURL(e.target.files[0])
  }

  /**
   * On arrow mouse down event.
   * Makes ripple.
   * @param {Event}
   */
  onArrowMouseDown = (e, target) => {
    if (!this.touched) {
      const ripple = Ripple.createRipple(this.elements.arrowIcon, this.props.arrowRippleStyle, createRippleCenter(this.elements.arrowIcon, 24))
      Ripple.makeRipple(ripple)
    }
  }

  /**
   * On arrow touch start event. (on mobile)
   * Makes ripple.
   * @param {Event}
   */
  onArrowTouchStart = (e) => {
    const ripple = Ripple.createRipple(this.elements.arrowIcon, this.props.arrowRippleStyle, createRippleCenter(this.elements.arrowIcon, 24, 0.4, true))
    Ripple.makeRipple(ripple)
    this.touched = true
  }

  onArrowClick = (e) => {
    window.location = '/'
  }

  render () {
    const rootStyle = {
      overflow: (!this.state.overflowHidden) ? 'auto' : 'hidden'
    }

    const avatarStyle = {
      backgroundImage: `url(${this.state.avatar})`
    }

    const preloaderContainerStyle = {
      display: (!this.state.preloader) ? 'none' : 'block'
    }

    const loginTextFieldHelperText = (!this.state.loginTextFieldHelperTextExists) ? 'Min. 4 znaki' : 'Użytkownik o takim loginie już istnieje'

    const emailTextFieldHelperText = (!this.state.emailTextFieldHelperTextExists) ? '*Wymagane' : 'Użytkownik o takim emailu już istnieje'

    return (
      <div>
        <div className='account-form register-form' ref={(e) => this.elements.root = e} style={rootStyle}>
          <div className='title-container'>
            <div className='arrow ripple-icon' ref={(e) => this.elements.arrowIcon = e} onMouseDown={this.onArrowMouseDown} onClick={this.onArrowClick}>
              <div className='icon' />
            </div>
            <div className='title'>
              Zajerestruj się
            </div>
          </div>
          <input style='display: none' />
          <input type='password' style='display: none' />
          <form autoComplete={false}>
            <div className='control-container'>
              <div className='control-title'>
                Avatar (opcjonalnie)
              </div>
              <div className='avatar' style={avatarStyle} ref={(e) => this.elements.avatar = e} onClick={() => { this.elements.avatarInput.click() }}>
                <div className='camera-container'>
                  <div className='camera' />
                </div>
              </div>
            </div>
            <TextField
              ref={(e) => this.elements.loginTextField = e}
              hint='Login'
              helperText={loginTextFieldHelperText}
              onInput={this.onTextFieldInput}
              autoComplete={false}
              name='register-login'
              className='login'
            />
            <TextField
              ref={(e) => this.elements.userNameTextField = e}
              className='username'
              hint='Imię i Nazwisko'
              helperText='Min. 5 znaków'
              onInput={this.onTextFieldInput}
              autoComplete={false}
              name='register-username'
            />
            <TextField
              ref={(e) => this.elements.emailTextField = e}
              hint='E-Mail'
              helperText={emailTextFieldHelperText}
              onInput={this.onTextFieldInput}
              autoComplete={false}
              name='register-email'
            />
            <TextField
              ref={(e) => this.elements.passwordTextField = e}
              className='password'
              hint='Hasło'
              helperText='Min. 4 znaki'
              onInput={this.onPasswordTextFieldInput}
              type='text'
              autoComplete={false}
              name='register-password'
            />
            <TextField
              ref={(e) => this.elements.passwordVerifyTextField = e}
              className='password-verify'
              hint='Powtórz hasło'
              helperText='*Wymagane'
              onInput={this.onPasswordTextFieldInput}
              type='text'
              autoComplete={false}
              name='register-password-verify'
            />
            <div className='control-container checkbox'>
              <div className='control-title'>
                Wyrażam zgodę na wgranie jako avatar na blogu, mojego avatara z facebooka (gdy opcja na samej górze jest nie wybrana)
              </div>
              <Checkbox ref={(e) => this.elements.checkbox = e} />
            </div>
            <div className='action-container'>
              <MaterialButton text='ZAREJESTRUJ' onClick={this.onRegisterButtonClick} />
              <a href='https://www.nersent.tk' target='_blank' className='copy-right'>
                &copy; 2013-2018
                <div className='nersent-logo' />
              </a>
            </div>
            <input className='avatar-input' ref={(e) => this.elements.avatarInput = e} type='file' name='pic' accept='image/*' onChange={this.onAvatarInputChange} />
          </form>
          <div className='preloader-container' style={preloaderContainerStyle}>
            <Preloader />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.elements.checkbox.check()
  }
}

Register.defaultProps = {
  arrowRippleStyle: {
    backgroundColor: '#fff',
    opacity: 0.2
  }
}
