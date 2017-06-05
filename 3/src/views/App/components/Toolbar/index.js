import MultiIcon from './components/MultiIcon'

export default class Toolbar {
  constructor () {
    this.elements = {}

    this.render()
  }

  setItems = (items) => {
    let first = true
    let hasLeftIcon = false
    let left = 16

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const type = item.type
      const position = item.position
      const style = item.style

      if (type === 'Icon') {
        let _style = Object.assign(
          {
            backgroundImage: 'url(' + item.image + ')'
          }, style
        )

        let className = ' toolbar-icon ripple-icon toolbar-' + position.toLowerCase()

        if (first) {
          if (position === 'Right') {
            className += ' toolbar-right-first'
          }
        }

        if (position === 'Left') {
          hasLeftIcon = true
        }

        const element = document.createElement('div')
        const id = item.id

        element.className = className
        if (id) element.id = id
        if (style) element.setStyle(style)

        if (item.subType === 'Menu') {
          this.MultiIcon = new MultiIcon()
          const multiIconRoot = this.MultiIcon.getRoot()

          element.appendChild(multiIconRoot)
        }

        this.elements.content.appendChild(element)
      } else if (type === 'Title') {
        if (hasLeftIcon) {
          left = 80
        }

        this.title = document.createElement('div')
        this.title.innerHTML += item.title

        this.title.setAttributes({
          class: 'toolbar-title'
        })

        if (style) this.title.setStyle(style)

        this.elements.content.appendChild(this.title)
      }
    }
  }

  render = () => {
    this.elements.root = document.createElement('div')
    this.elements.root.setAttributes({
      class: 'toolbar toolbar-shadow'
    })

    this.elements.content = document.createElement('div')
    this.elements.content.setAttributes({
      class: 'toolbar-content'
    })

    this.elements.root.appendChild(this.elements.content)
  }
}
