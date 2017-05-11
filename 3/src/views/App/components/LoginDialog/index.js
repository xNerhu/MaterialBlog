import React from 'react'

import Dialog from '../../../../imports/materialdesign/components/Dialog'
import TextField from '../../../../imports/materialdesign/components/TextField'

export default class LoginDialog extends React.Component {
  constructor () {
    super()

    this.state = {
      passwordVisible: false
    }
  }

  /**
   * Shows dialog.
   */
  show = () => {
    if (this.refs.login.state.error && this.refs.login.state.focusedDivider) this.toggleError(this.refs.login, false)
    if (this.refs.password.state.error && this.refs.password.state.focusedDivider) this.toggleError(this.refs.password, false)
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
    var loginElement = this.refs.login
    var passwordElement = this.refs.password

    if (loginElement.getValue().length < 1) this.toggleError(loginElement, true)
    if (passwordElement.getValue().length < 1) this.toggleError(passwordElement, true)
  }

  /**
   * On login input event.
   */
  onLoginInput = () => {
    var element = this.refs.login

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

    const actionButtons = [
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

    return (
      <div>
        <Dialog ref='dialog' title='Zaloguj się' width={300} actionButtons={actionButtons}>
          <TextField
            ref='login'
            hint='Login/E-Mail'
            type='email'
            placeHolder={false}
            focusColor='#2196f3'
            helperText='*Wymagane'
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
            helperText='*Wymagane'
            onInput={this.onPasswordInput}
            onBlur={this.onPasswordInput}
          />
          <div className='login-dialog-forgot-password'>
            Zapomniałem/am hasła
          </div>
        </Dialog>
      </div>
    )
  }
}
