import Component from '../../../../../../../helpers/Component'

import Cell from './components/Cell'

export default class Item extends Component {
  /**
   * Gets root.
   * @return {DOMElement} root
   */
  getRoot = () => {
    return this.elements.root
  }

  render () {
    return (
      <div className='posts-table-list-item'>
        <Cell getMobileTable={this.props.getMobileTable} title='AKCJA' isCheckBox='true' />
        <Cell getMobileTable={this.props.getMobileTable} title='ID' ref='id' />
        <Cell getMobileTable={this.props.getMobileTable} title='AUTOR' ref='author' />
        <Cell getMobileTable={this.props.getMobileTable} title='DATA' ref='date' />
        <Cell getMobileTable={this.props.getMobileTable} title='KOMENTARZE' ref='comments' />
        <Cell getMobileTable={this.props.getMobileTable} title='POLUBIENIA' ref='likes' />
        <Cell getMobileTable={this.props.getMobileTable} title='TYTUŁ' ref='title' />
        <Cell getMobileTable={this.props.getMobileTable} title='TREŚĆ' ref='content' />
      </div>
    )
  }

  afterRender () {
    const data = this.props.data

    this.elements.id.setText(data.id)
    this.elements.author.setText(data.author)
    this.elements.date.setText(data.date)
    this.elements.comments.setText(data.comments.length)
    this.elements.likes.setText(data.likes.length)
    this.elements.title.setText(data.title)
    this.elements.content.setText(data.content)
  }
}
