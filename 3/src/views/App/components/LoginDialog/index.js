import React from 'react'

import Dialog from '../../../../imports/materialdesign/components/Dialog'
import Preloader from '../../../../imports/materialdesign/components/Preloader'
import TextField from '../../../../imports/materialdesign/components/TextField'

export default class LoginDialog extends React.Component {
  constructor () {
    super()

    this.defaultTitle = 'Zaloguj się'
    this.logginTitle = 'Logowanie...'
    this.loggedTitle = 'Witaj na naszym blogu!'

    this.state = {
      passwordVisible: false,
      loggin: false,
      logged: false,
      loginHelperText: '*Wymagane',
      passwordHelperText: '*Wymagane'
    }
  }

  /**
   * Shows dialog.
   */
  show = () => {
    if (this.refs.login.state.error && this.refs.login.state.focusedDivider) this.toggleError(this.refs.login, false)
    if (this.refs.password.state.error && this.refs.password.state.focusedDivider) this.toggleError(this.refs.password, false)
    this.refs.login.setValue('')
    this.refs.password.setValue('')
    this.refs.dialog.show()
  }

  /**
   * On Password Action Icon click event.
   * Shows or hides password.
   */
  onPasswordActionIconClick = () => {
    this.setState({
      passwordVisible: !this.state.passwordVisible
    })
  }

  /**
   * Logs user.
   */
  login = () => {
    var self = this
    var loginElement = this.refs.login
    var passwordElement = this.refs.password
    const login = loginElement.getValue()
    const password = passwordElement.getValue()

    if (login.length < 1) this.toggleError(loginElement, true)
    if (password.length < 1) this.toggleError(passwordElement, true)

    if (login.length >= 1 && password.length >= 1) {
      this.setState({
        loggin: true
      })
      // TODO: Request
      setTimeout(function () {
        self.setState({
          loggin: false
        })
        const loginCorrect = true
        const passwordCorrect = true
        if (!loginCorrect) {
          self.setState({
            loginHelperText: 'Nie poprawne'
          })
          self.toggleError(loginElement, true)
        }
        if (!passwordCorrect) {
          self.setState({
            passwordHelperText: 'Nie poprawne'
          })
          self.toggleError(passwordElement, true)
        }
        if (loginCorrect && passwordCorrect) {
          self.setState({
            logged: true
          })
          setTimeout(function () {
            self.refs.content.style.display = 'none'
            self.refs.message.style.display = 'block'
            setTimeout(function () {
              self.refs.message.style.opacity = '1'
              self.refs.message.style.marginLeft = '0px'
              setTimeout(function () {
                var img = new Image()

                img.onload = function () {
                  self.refs.messageAvatar.style.backgroundImage = 'url(' + this.src + ')'
                  self.refs.messageAvatar.style.width = '96px'
                  self.refs.messageAvatar.style.height = '96px'
                }
                img.src = 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/14581320_549947718524540_5437545186607783553_n.jpg?oh=1d709d8978f80d6887041c3e9583f27f&oe=59994281'
              }, 150)
            }, 50)
          }, 200)
        }
      }, 1000)
    }
  }

  /**
   * On login input event.
   */
  onLoginInput = () => {
    var element = this.refs.login

    this.setState({
      loginHelperText: '*Wymagane'
    })
    if (element.getValue().length >= 1) {
      if (element.state.focusedDivider && element.state.error) {
        this.toggleError(element, false)
      }
    } else {
      if (!element.state.focusedDivider && !element.state.error) {
        this.toggleError(element, true)
      }
    }
  }

  /**
   * Toggled on or off error.
   * @param {DOMObject} element.
   * @param {Boolean} flag.
   */
  toggleError = (element, flag) => {
    element.setState({
      focusedDivider: flag,
      error: flag
    })
  }

  /**
   * On password input event.
   */
  onPasswordInput = () => {
    var element = this.refs.password

    this.setState({
      passwordHelperText: '*Wymagane'
    })
    if (element.getValue().length >= 1) {
      if (element.state.focusedDivider && element.state.error) {
        this.toggleError(element, false)
      }
    } else {
      if (!element.state.focusedDivider && !element.state.error) {
        this.toggleError(element, true)
      }
    }
  }

  render () {
    var self = this

    // Styles.
    const contentStyle = {
      visibility: (!this.state.loggin) ? 'visible' : 'hidden',
      opacity: (!this.state.loggin) ? 1 : 0,
      marginLeft: (!this.state.logged) ? 0 : 'calc(-100% - 48px)'
    }

    const preloaderStyle = {
      display: (!this.state.loggin) ? 'none' : 'block'
    }

    const passwordStyle = {
      marginTop: 48
    }

    const passwordInputStyle = {
      width: 'calc(100% - 26px)'
    }

    const passwordType = (!this.state.passwordVisible) ? 'password' : 'text'

    const passwordActionIcon = (!this.state.passwordVisible) ? 'src/images/LoginDialog/visible.png' : 'src/images/LoginDialog/hidden.png'

    const passwordActionIconStyle = {
      top: 4
    }

    const actionButtonsDefault = [
      {
        text: 'ZALOGUJ',
        shadow: false,
        style: {},
        rippleStyle: {
          backgroundColor: '#2196f3'
        },
        foreground: '#2196f3',
        backgroundColor: 'transparent',
        onClick: self.login
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
    ]

    const actionButtonsLogin = [
      {
        text: 'ANULUJ',
        shadow: false,
        style: {},
        rippleStyle: {
          backgroundColor: '#2196f3'
        },
        foreground: '#2196f3',
        backgroundColor: 'transparent'
      }
    ]

    const actionButtonsLogged = [
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

    var actionButtons = actionButtonsDefault
    if (this.state.loggin) actionButtons = actionButtonsLogin
    else if (this.state.logged) actionButtons = actionButtonsLogged

    var dialogTitle = this.defaultTitle
    if (this.state.loggin) dialogTitle = this.logginTitle
    else if (this.state.logged) dialogTitle = this.loggedTitle

    return (
      <div>
        <Dialog ref='dialog' title={dialogTitle} width={300} actionButtons={actionButtons}>
          <div className='login-dialog-content' ref='content' style={contentStyle}>
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
              ref='password'
              hint='Hasło'
              type={passwordType}
              style={passwordStyle}
              placeHolder={false}
              focusColor='#2196f3'
              actionIcon={passwordActionIcon}
              actionIconStyle={passwordActionIconStyle}
              inputStyle={passwordInputStyle}
              onActionIconClick={this.onPasswordActionIconClick}
              helperText={this.state.passwordHelperText}
              onInput={this.onPasswordInput}
              onBlur={this.onPasswordInput}
            />
            <div className='login-dialog-forgot-password'>
              Zapomniałem/am hasła
            </div>
          </div>
          <div className='login-dialog-message' ref='message'>
            <div className='login-dialog-message-avatar' ref='messageAvatar' />
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
