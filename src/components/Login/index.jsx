import Component from 'inferno-component'
import Url from 'url'

import { login } from '../../actions/auth'

import Preloader from '../../materialdesign/components/Preloader'
import TextField from '../../materialdesign/components/TextField'
import MaterialButton from '../../materialdesign/components/MaterialButton'

export default class Login extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      loginHelperText: '',
      passwordHelperText: ''
    }

    this.touched = false
  }

  /**
   * On textfield input.
   * @param {Event}
   * @param {TextField}
   */
  onTextFieldInput = (e, textfield) => {
    if (textfield.error) {
      textfield.toggleError(false)
      if (textfield.helperText !== '') textfield.setHelperText('')
    }
  }

  /**
   * On button login click.
   * Logs user.
   * @param {Event}
   */
  onLoginButtonClick = async (e) => {
    if (this.verify()) {
      const loginTextField = this.elements.loginTextField
      const passwordTextField = this.elements.passwordTextField

      this.togglePreloader(true)

      const json = await login(loginTextField.getValue(), passwordTextField.getValue())
      if (json.success) {
        const backToBlog = Url.parse(window.location.href, true).query.backtoblog

        window.location = (backToBlog !== 'true') ? '/panel' : '/'
      } else {
        if (json.message === 'incorrect_username') {
          loginTextField.toggleError(true)
          this.setState({
            loginHelperText: 'Nieprawidłowa nazwa użytkownika lub email'
          })
        } else if (json.message === 'incorrect_password') {
          passwordTextField.toggleError(true)
          this.setState({
            passwordHelperText: 'Nieprawidłowe hasło'
          })
        }

        this.togglePreloader(false)
      }
    }
  }

  /**
   * Verifies form.
   * @return {Boolean} error
   */
  verify () {
    const login = this.elements.loginTextField
    const password = this.elements.passwordTextField

    let error = false

    if (login.getValue().length < 1) {
      login.toggleError(true)
      error = true
    }

    if (password.getValue().length < 1) {
      password.toggleError(true)
      error = true
    }

    return !error
  }

  /**
   * Shows or hides preloader.
   * @param {Boolean}
   */
  togglePreloader (flag) {
    const preloaderContainer = this.elements.preloaderContainer

    preloaderContainer.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(() => {
      preloaderContainer.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 300)
  }

  onTextFieldKeyPress = (e) => {
    if (e.keyCode === 13) this.onLoginButtonClick()
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
    const backToBlog = Url.parse(window.location.href, true).query.backtoblog

    window.location = (backToBlog !== 'true') ? '/panel' : '/'
  }

  render () {
    return (
      <div>
        <div className='account-form' ref={(e) => this.elements.root = e}>
          <div className='title-container'>
            <div className='arrow ripple-icon' ref={(e) => this.elements.arrowIcon = e} onMouseDown={this.onArrowMouseDown} onClick={this.onArrowClick}>
              <div className='icon' />
            </div>
            <div className='title'>
              Zaloguj się
            </div>
          </div>
          <form autoComplete={false}>
            <TextField
              ref={(e) => this.elements.loginTextField = e}
              placeholder='Login/Email'
              helperText={this.state.loginHelperText}
              type='email'
              onInput={this.onTextFieldInput}
              name='login-username'
            />
            <TextField
              ref={(e) => this.elements.passwordTextField = e}
              className='password'
              placeholder='Hasło'
              helperText={this.state.passwordHelperText}
              type='password'
              onInput={this.onTextFieldInput}
              name='login-password'
            />
            <div className='action-container'>
              <MaterialButton text='ZALOGUJ' onClick={this.onLoginButtonClick} />
              <a href='http://www.blog.nersent.tk/reset-password' className='reset-password'>
                Nie pamiętasz hasła?
              </a>
            </div>
          </form>
          <div className='preloader-container' ref={(e) => this.elements.preloaderContainer = e}>
            <Preloader />
          </div>
        </div>
        <div className='register-form-footer'>
          <a href='https://www.github.com/xNerhu22/MyClassBlog' target='_blank' className='github'>
            GitHub
          </a>
          <a href='https://www.nersent.tk' target='_blank' className='copy-right'>
            &copy; 2013-2018 Nersent
            <div className='nersent-logo' />
          </a>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const loginTextField = this.elements.loginTextField
    const passwordTextField = this.elements.passwordTextField

    loginTextField.elements.input.addEventListener('keypress', this.onTextFieldKeyPress)
    passwordTextField.elements.input.addEventListener('keypress', this.onTextFieldKeyPress)
    this.elements.arrowIcon.addEventListener('touchstart', this.onArrowTouchStart)
  }
}

Login.defaultProps = {
  arrowRippleStyle: {
    backgroundColor: '#fff',
    opacity: 0.2
  }
}
