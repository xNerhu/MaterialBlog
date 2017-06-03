import React from 'react'

import Checkbox from '../../../../../../../imports/materialdesign/components/Checkbox'

export default class Cell extends React.Component {
  componentDidMount () {
    this.refs.title.innerHTML = this.props.data.title
    this.refs.content.innerHTML = this.props.data.content
  }

  render () {
    return (
      <tr>
        <td>
          <Checkbox onColor='#3F51B5' />
        </td>
        <td>
          {
            this.props.data.id
          }
        </td>
        <td>
          {
            this.props.data.author
          }
        </td>
        <td>
          {
            this.props.data.date
          }
        </td>
        <td>
          {
            this.props.data.comments.length
          }
        </td>
        <td>
          {
            this.props.data.likes.length
          }
        </td>
        <td ref='title' />
        <td ref='content' />
      </tr>
    )
  }
}
