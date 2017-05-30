import React from 'react'

import Dialog from '../../../../imports/materialdesign/components/Dialog'
import Preloader from '../../../../imports/materialdesign/components/Preloader'
import TextField from '../../../../imports/materialdesign/components/TextField'

export default class LoginDialog extends React.Component {
  constructor () {
    super()

    this.state = {
      toggledPreloader: false,
      inputPassword: false,
      dialogTitle: '',
      loginHelperText: '*Wymagane',
      passwordHelperText: '*Wymagane',
      actionButtons: []
    }

    this.titles = {
      default: 'Zaloguj się',
      loggin: 'Logowanie',
      logged: 'Witaj na naszym blogu!'
    }

    this.buttons = {
      default: [],
      loggin: [],
      logged: []
    }
  }

  componentDidMount = () => {
    const self = this
    const buttons = {
      default: [
        {
          text: 'ZALOGUJ',
          shadow: false,
          style: {},
          rippleStyle: {
            backgroundColor: '#2196f3'
          },
          foreground: '#2196f3',
          backgroundColor: 'transparent',
          onClick: this.onLoginButtonClick
        }, {
          text: 'ANULUJ',
          shadow: false,
          style: {},
          rippleStyle: {
            backgroundColor: '#2196f3'
          },
          foreground: '#2196f3',
          backgroundColor: 'transparent',
          onClick: function () {
            self.refs.dialog.hide()
          }
        }
      ],
      logged: [
        {
          text: 'ZAMKNIJ',
          shadow: false,
          style: {},
          rippleStyle: {
            backgroundColor: '#2196f3'
          },
          foreground: '#2196f3',
          backgroundColor: 'transparent',
          onClick: function () {
            self.refs.dialog.hide()
          }
        }
      ]
    }

    this.buttons = buttons

    this.setState({
      actionButtons: this.buttons.default,
      dialogTitle: this.titles.default
    })
  }

  /**
   * Shows dialog.
   */
  show = () => {
    /*if (this.refs.login.state.error && this.refs.login.state.focusedDivider) this.toggleError(this.refs.login, false)
    if (this.refs.password.state.error && this.refs.password.state.focusedDivider) this.toggleError(this.refs.password, false)
    this.refs.login.setValue('')
    this.refs.password.setValue('')*/
    this.refs.dialog.show()
  }

  /**
   * On login button click event.
   * @param {Object} event data.
   */
  onLoginButtonClick = (e) => {
    const login = this.refs.login
    const password = this.refs.password
    const l = this.checkForError(login)
    const p = this.checkForError(password)

    if (l && p) {
      this.login()
    }
  }

  /**
   * Logs user.
   */
  login = () => {
    const self = this
    const content = this.refs.content

    content.style.opacity = '0'

    this.setState({
      toggledPreloader: true,
      dialogTitle: this.titles.loggin
    })

    // TODO: Make request
    const timer = setTimeout(function () {
      self.setState({
        toggledPreloader: false,
        dialogTitle: self.titles.logged,
        actionButtons: self.buttons.logged
      })

      self.showMessage()
    }, 1000)

    function cancel () {
      clearTimeout(timer)
      self.setState({
        toggledPreloader: false,
        dialogTitle: self.titles.default,
        actionButtons: self.buttons.default
      })
      content.style.display = 'block'
      setTimeout(function () {
        content.style.opacity = '1'
      }, 1)
    }

    this.setState({
      actionButtons: [
        {
          text: 'ANULUJ',
          shadow: false,
          style: {},
          rippleStyle: {
            backgroundColor: '#2196f3'
          },
          foreground: '#2196f3',
          backgroundColor: 'transparent',
          onClick: function () {
            cancel()
          }
        }
      ]
    })
  }

  /**
   * Shows message.
   */
  showMessage = () => {
    const message = this.refs.message
    const avatar = this.refs.avatar

    this.refs.content.style.display = 'none'
    message.style.display = 'block'
    setTimeout(function () {
      message.style.opacity = '1'

      setTimeout(function () {
        const img = new Image()

        img.onload = function () {
          avatar.style.backgroundImage = 'url(' + this.src + ')'
          avatar.style.width = '96px'
          avatar.style.height = '96px'
        }

        img.src = 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
      }, 150)
    }, 10)
  }

  /**
   * On login textfield input event.
   * @param {Object} event data.
   */
  onLoginInput = (e) => {
    const element = this.refs.login

    this.checkForError(element)
  }

  /**
   * On password textfield input event.
   * @param {Object} event data.
   */
  onPasswordInput = (e) => {
    const element = this.refs.password

    this.checkForError(element)
  }

  /**
   * On password textfield action icon click event.
   * @param {Object} event data.
   */
  onActionIconClick = (e) => {
    this.setState({
      inputPassword: !this.state.inputPassword
    })
  }

  /**
   * Checks for error.
   * @param {DOMElement}
   * @return {Boolean} is error.
   */
  checkForError = (element) => {
    const value = element.getValue()

    if (value.length < 1) {
      this.toggleError(element, true)
      return false
    } else {
      this.toggleError(element, false)
      return true
    }
  }

  /**
   * Disables or enables error.
   * @param {DOMElement}
   * @param {Boolean} enable or disable.
   */
  toggleError = (element, flag) => {
    element.setState({
      focusedDivider: flag,
      error: flag
    })
  }

  render () {
    // Styles.
    const preloaderStyle = {
      display: (!this.state.toggledPreloader) ? 'none' : 'block'
    }

    const passwordType = (!this.state.inputPassword) ? 'password' : 'text'

    const passwordActionIcon = (!this.state.inputPassword) ? 'src/images/LoginDialog/visible.png' : 'src/images/LoginDialog/hidden.png'

    return (
      <div>
        <Dialog ref='dialog' className='login-dialog' title={this.state.dialogTitle} actionButtons={this.state.actionButtons}>
          <div className='login-dialog-content' ref='content'>
            <TextField
              ref='login'
              hint='Login/E-Mail'
              type='email'
              placeHolder={false}
              focusColor='#2196f3'
              helperText={this.state.loginHelperText}
              onInput={this.onLoginInput}
              onBlur={this.onLoginInput}
            />
            <TextField
              className='login-dialog-password'
              ref='password'
              hint='Hasło'
              type={passwordType}
              placeHolder={false}
              focusColor='#2196f3'
              actionIcon={passwordActionIcon}
              onActionIconClick={this.onActionIconClick}
              helperText={this.state.passwordHelperText}
              onInput={this.onPasswordInput}
              onBlur={this.onPasswordInput}
            />
            <div className='login-dialog-forgot-password'>
              Zapomniałem(am) hasła
            </div>
          </div>
          <div className='login-dialog-message' ref='message'>
            <div className='login-dialog-message-avatar'>
              <div className='login-dialog-message-avatar-pic' ref='avatar' />
            </div>
            Zostałeś zalogowany na koncie Nersent!
            <br />
            Możesz komentować wszystkie posty,
            <br />
            edytować informacje o sobie tutaj
            <br />
            oraz logować się do aplikacji Nersent
            <br />
          </div>
          <Preloader style={preloaderStyle} className='login-dialog-preloader' strokeColor='#2196f3' strokeWidth={4} />
        </Dialog>
      </div>
    )
  }
}
