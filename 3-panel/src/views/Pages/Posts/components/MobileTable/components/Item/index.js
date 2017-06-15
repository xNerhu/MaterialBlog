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
      <div className='posts-table-mobile-item'>
        <Cell title='AKCJA' isCheckBox='true' />
        <Cell title='ID' ref='id' />
        <Cell title='AUTOR' ref='author' />
        <Cell title='DATA' ref='date' />
        <Cell title='KOMENTARZE' ref='comments' />
        <Cell title='POLUBIENIA' ref='likes' />
        <Cell title='TYTUŁ' ref='title' />
        <Cell title='TREŚĆ' ref='content' />
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
    this.elements.title.setText(data.content)
  }
}
