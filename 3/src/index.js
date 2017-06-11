import App from './views/App'

import './styles.scss'

// Wait for sass load.
setTimeout(function () {
  new App(document.getElementById('app'))
}, 1)
