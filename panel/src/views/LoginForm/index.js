import Component from '../../helpers/Component'

import Preloader from './../../imports/materialdesign/components/Preloader'
import TextField from './../../imports/materialdesign/components/TextField'
import MaterialButton from './../../imports/materialdesign/components/MaterialButton'

export default class LoginForm extends Component {
  beforeRender () {
    window.loginForm = this
  }

  /**
   * On textfield input.
   * @param {Event}
   * @param {TextField}
   */
  onTextFieldInput = (e, textfield) => {
    if (textfield.error) textfield.toggleError(false)
  }

  /**
   * On button login click.
   * Logs user.
   * @param {Event}
   */
  onLoginButtonClick = (e) => {
    if (!this.validate()) {
      this.togglePreloader(true)
    }
  }

  /**
   * Validates form.
   * @return {Boolean} error
   */
  validate () {
    const login = this.elements.login
    const password = this.elements.password

    let error = false

    if (login.getValue().length < 1) {
      login.toggleError(true)
      error = true
    }

    if (password.getValue().length < 1) {
      password.toggleError(true)
      error = true
    }

    return error
  }

  /**
   * Shows or hides preloader.
   * @param {Boolean}
   */
  togglePreloader (flag) {
    const preloaderContainer = this.elements.preloaderContainer

    preloaderContainer.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(function () {
      preloaderContainer.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 300)
  }

  render () {
    return (
      <div>
        <div className='login-form'>
          <div className='title'>
            Zaloguj się
          </div>
          <div className='form'>
            <TextField hint='Login/Email' ref='login' onInput={this.onTextFieldInput} />
            <TextField className='password' hint='Hasło' type='password' ref='password' onInput={this.onTextFieldInput} />
            <div className='incorrect-data'>
              Dane są nieprawidłowe
            </div>
            <div className='bottom-container'>
              <MaterialButton text='ZALOGUJ' onClick={this.onLoginButtonClick} />
              <a href='http://www.blog.nersent.tk/reset-password' className='reset-password'>
                Nie pamiętasz hasła?
              </a>
            </div>
          </div>
          <div className='preloader-container' ref='preloaderContainer'>
            <Preloader />
          </div>
        </div>
        <a href='https://www.github.com/xNerhu22/MyClassBlog' target='_blank' className='github'>
          GitHub
        </a>
        <a href='https://www.nersent.tk' target='_blank' className='copy-right'>
          &copy; 2013-2018 Nersent
          <div className='nersent-logo' />
        </a>
      </div>
    )
  }
}
