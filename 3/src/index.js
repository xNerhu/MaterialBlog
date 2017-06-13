import App from './views/App'
import UI from './helpers/UI'

import './styles.scss'

// Wait for sass load.
setTimeout(function () {
  UI.render(new App(), document.getElementById('app'))
}, 1)
