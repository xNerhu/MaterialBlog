import Component from 'inferno-component'

import { changeUserSettings } from '../../../../actions/user'

import TextField from '../../../../materialdesign/components/TextField'
import MaterialButton from '../../../../materialdesign/components/MaterialButton'
import Preloader from '../../../../materialdesign/components/Preloader'

export default class LessonsPlan extends Component {
  constructor () {
    super()
    this.elements = {}

    this.toggledButtons = false
    this.canShowButtons = false
    this.avatar = ''
  }

  load () {
    window.panel.togglePreloader(false)

    this.updateForm()
    this.elements.container.style.opacity = '1'
  }

  /**
   * Updates form.
   */
  updateForm () {
    const panel = window.panel
    const userInfo = panel.state.userInfo

    this.canShowButtons = false

    this.elements.login.setValue(userInfo.login)
    this.elements.name.setValue(userInfo.username)
    this.elements.email.setValue(userInfo.email)
    this.elements.password.setValue('')
    this.elements.passwordVerify.setValue('')

    this.avatar = panel.state.userInfo.avatar
    this.elements.avatar.style.backgroundImage =  'url(' + panel.state.userInfo.avatar + ')'

    setTimeout(() => {
      this.canShowButtons = true
    }, 1)
  }

  /**
   * Shows or hides action buttons. (save and cancel)
   * @param {Boolean}
   */
  toggleButtons (flag) {
    const buttonsContainer = this.elements.buttonsContainer

    buttonsContainer.style.height = ((flag) ? buttonsContainer.scrollHeight : 0) + 'px'

    this.toggledButtons = flag
  }

  /**
   * Shows or hides preloader.
   * @param {Boolean}
   */
  togglePreloader (flag) {
    const container = this.elements.preloaderContainer

    container.style[(flag) ? 'display' : 'opacity'] = (flag) ? 'block' : '0'

    setTimeout(() => {
      container.style[(flag) ? 'opacity' : 'display'] = (flag) ? '1' : 'none'
    }, (flag) ? 20 : 200)
  }

  /**
   * On textfield input.
   * Shows action buttons.
   * Disables error if enabled.
   * @param {Event}
   * @param {TextField}
   */
  onTextFieldInput = (e, textField) => {
    // If inputs are not loading for first time.
    if (!this.toggledButtons && this.canShowButtons) {
      this.toggleButtons(true)
    }

    // If error is enabled then disable
    if (textField.error) textField.toggleError(false)
  }

  /**
   * Checks that form is correct.
   */
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

    if (password.length >= 1 && password !== passwordVerify) return passwordVerifyTextField.toggleError(true)

    return correct
  }

  verifyTextField (textField) {
    if (textField.getValue().length < 1) return textField.toggleError(true)

    return true
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
      this.elements.avatar.style.backgroundImage = 'url(' + src + ')'
      this.avatar = src
      // Show action buttons
      this.toggleButtons(true)
      // Reset input value
      e.target.value = ''
    }

    reader.readAsDataURL(e.target.files[0])
  }

  /**
   * On cancel button click.
   * Backs settings.
   * Updates form and toggle off action buttons.
   * @param {Event}
   */
  onCancelButtonClick = (e) => {
    // Back settings
    this.updateForm()
    // Hide action buttons
    this.toggleButtons(false)
  }

  /**
   * On save button click.
   * Saves settings.
   * @param {Event}
   */
  onSaveButtonClick = async (e) => {
    if (this.verifyData()) {
      this.toggleButtons(false)
      this.togglePreloader(true)

      const login = this.elements.login.getValue()
      const username = this.elements.name.getValue()
      const email = this.elements.email.getValue()
      const password = this.elements.password.getValue()
      const passwordVerify = this.elements.passwordVerify.getValue()

      const json = await changeUserSettings(login, username, email, this.avatar, password, passwordVerify)
      if (!json.success) return console.error(json)

      const browserHistory = window.app.getBrowserHistory()
      browserHistory.push('/panel/login')
    }
  }

  render () {
    return (
      <div className='panel-page manage-account' ref={(e) => this.elements.root = e}>
        <div className='panel-manage-account-form' ref={(e) => this.elements.container = e}>
          <div className='section avatar'>
            <div className='title'>
              Avatar
            </div>
            <div className='control'>
              <div className='avatar' ref={(e) => this.elements.avatar = e} onClick={() => { this.elements.avatarInput.click() }}>
                <div className='camera-container'>
                  <div className='camera' />
                </div>
              </div>
            </div>
          </div>
          <div className='section login'>
            <div className='title'>
              Login
            </div>
            <div className='control'>
              <TextField ref={(e) => this.elements.login = e} onInput={this.onTextFieldInput} value='xddd' />
            </div>
          </div>
          <div className='section name'>
            <div className='title'>
              Imię i Nazwisko
            </div>
            <div className='control'>
              <TextField ref={(e) => this.elements.name = e} onInput={this.onTextFieldInput} />
            </div>
          </div>
          <div className='section email'>
            <div className='title'>
              E-Mail
            </div>
            <div className='control'>
              <TextField ref={(e) => this.elements.email = e} onInput={this.onTextFieldInput} />
            </div>
          </div>
          <div className='section password'>
            <div className='title'>
              Hasło
            </div>
            <div className='control'>
              <TextField ref={(e) => this.elements.password = e} type='password' onInput={this.onTextFieldInput} />
            </div>
          </div>
          <div className='section password-verify'>
            <div className='title'>
              Powtórz hasło
            </div>
            <div className='control'>
              <TextField ref={(e) => this.elements.passwordVerify = e} type='password' onInput={this.onTextFieldInput} />
            </div>
          </div>
          <div className='buttons-container' ref={(e) => this.elements.buttonsContainer = e}>
            <MaterialButton text='ZAPISZ' onClick={this.onSaveButtonClick} shadow={false} rippleStyle={{
              backgroundColor: '#3f51b5',
              opacity: 0.2
            }} />
            <MaterialButton className='cancel' onClick={this.onCancelButtonClick} text='ANULUJ' shadow={false} rippleStyle={{
              backgroundColor: '#000',
              opacity: 0.2
            }} />
          </div>
          <div className='preloader-container' ref={(e) => this.elements.preloaderContainer = e}>
            <Preloader />
          </div>
          <input className='avatar-input' ref={(e) => this.elements.avatarInput = e} type='file' name='pic' accept='image/*' onChange={this.onAvatarInputChange} />
        </div>
      </div>
    )
  }

  componentDidMount () {
    const panel = window.panel
    const title = 'Zarządzaj kontem'

    panel.defaultToolbarTitle = title
    panel.setState({
      toolbarTitle: title
    })

    panel.elements.manageAccountPage = this
    panel.toggleFAB(false)
  }
}
