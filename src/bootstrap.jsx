import Inferno from 'inferno'

import 'babel-polyfill'

import './app.scss'

import App from './components/App'

// Wait for sass load.
window.onload = () => {
  Inferno.render((
    <App />
  ), document.getElementById('app'))
}
