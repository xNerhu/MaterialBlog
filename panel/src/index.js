import App from './views/App'
import LoginForm from './views/LoginForm'
import UI from './helpers/UI'

import './styles.scss'

// Wait for sass load.
window.onload = function () {
  const logged = false
  const app = (logged) ? new App() : new LoginForm()
  UI.render(app, document.getElementById('app'))
}
