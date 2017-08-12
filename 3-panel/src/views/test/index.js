import Component from '../../helpers/Component'

import TimePicker from './../../imports/materialdesign/components/TimePicker'

export default class App extends Component {
  beforeRender () {
    window.app = this
  }

  render () {
    return (
      <div>
        <div className='app-content' ref='appContent'>
          <TimePicker />
        </div>
      </div>
    )
  }
}
