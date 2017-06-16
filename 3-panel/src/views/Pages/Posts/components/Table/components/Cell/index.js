import Component from '../../../../../../../helpers/Component'

import Checkbox from '../../../../../../../imports/materialdesign/components/CheckBox'

export default class Cell extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  render () {
    return (
      <tr ref='root'>
        <td>
          <Checkbox ref='checkbox' />
        </td>
        <td ref='id' />
        <td>
          {
            this.props.data.author
          }
        </td>
        <td ref='date' />
        <td ref='comments' />
        <td ref='likes' />
        <td>
          {
            this.props.data.title
          }
        </td>
        <td ref='content' />
      </tr>
    )
  }

  afterRender () {
    const data = this.props.data

    this.elements.id.innerHTML = data.id
    this.elements.date.innerHTML = data.date
    this.elements.comments.innerHTML = data.comments.length
    this.elements.likes.innerHTML = data.likes.length
    this.elements.content.innerHTML = data.content

    this.props.getDesktopTable().cells.push(this)
  }
}
