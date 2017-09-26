import Component from 'inferno-component'

import Category from '../Category'

export default class Section extends Component {
  render () {
    return (
      <div className='gallery-section'>
        <div className='sub-header'>
          {
            this.props.data.subheader
          }
        </div>
        <div className='categories-container'>
          {
            this.props.data.categories.map((data, key) => {
              return (
                <Category
                  data={data}
                  key={key}
                  onClick={this.props.onCategoryClick}
                  section={this}
                  menuIcon={this.props.categoryMenuIcon}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
