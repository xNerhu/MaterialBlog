import Component from 'inferno-component'

import { getPosts } from '../../../../../../actions/posts'

import Dialog from '../../../../../../materialdesign/components/Dialog'
import DropDown from '../../../../../../materialdesign/components/DropDown'

export default class PostsFilterDialog extends Component {
  constructor () {
    super()
    this.elements = {}

    this.state = {
      dialogItems: [
        {
          text: 'OK',
          onClick: this.onOKButtonClick
        },
        {
          text: 'ANULUJ',
          onClick: this.onCancelButtonClick
        }
      ],
      userDropDownItems: [],
      timePeriodDropDownItems: [
        {
          text: 'Cały czas',
          data: {
            time: null
          },
          selected: true
        },
        {
          text: '6 Miesięcy',
          data: {
            time: 6
          }
        },
        {
          text: '5 Miesięcy',
          data: {
            time: 5
          }
        },
        {
          text: '4 Miesiące',
          data: {
            time: 4
          }
        },
        {
          text: '3 Miesiące',
          data: {
            time: 3
          }
        },
        {
          text: '2 Miesiące',
          data: {
            time: 2
          }
        },
        {
          text: 'Miesiąc',
          data: {
            time: 1
          }
        }
      ]
    }
  }
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot () {
    return this.elements.root
  }

  onCancelButtonClick = (e) => {
    this.elements.dialog.toggle(false)
  }

  /**
   * Shows dialog.
   */
  show () {
    this.elements.dialog.toggle(true)
  }

  getFilterSettings () {
    return {
      userID: this.elements.userDropDown.selectedItem.props.data._id,
      timePeriod: this.elements.timePeriodDropDown.selectedItem.props.data.time
    }
  }

  onOKButtonClick = async (e) => {
    const panel = window.panel
    const postsPage = panel.elements.postsPage
    const postsPageRoot = postsPage.elements.root

    this.elements.dialog.toggle(false)

    postsPageRoot.style.opacity = '0'
    panel.togglePreloader(true)

    const selectedPosts = postsPage.getSelectedPosts()

    // Get filter settings
    const settings = this.getFilterSettings()

    const json = await getPosts('all', settings.userID, settings.timePeriod)

    if (json.success === false) return console.error(json)

    postsPage.setState({
      posts: json
    })

    postsPageRoot.style.opacity = '1'
    panel.togglePreloader(false)
  }

  render () {
    return (
      <div className='filter-dialog' ref={(e) => this.elements.root = e}>
        <Dialog title={false} ref={(e) => this.elements.dialog = e} items={this.state.dialogItems} closeDialogOnDarkClick={false}>
          <div className='filter-dialog-section'>
            <div className='title'>
              Użytkownik
            </div>
            <div className='control'>
              <DropDown ref={(e) => this.elements.userDropDown = e} items={this.state.userDropDownItems} />
            </div>
          </div>
          <div className='filter-dialog-section'>
            <div className='title'>
              Okres
            </div>
            <div className='control'>
              <DropDown ref={(e) => this.elements.timePeriodDropDown = e} items={this.state.timePeriodDropDownItems} />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}
