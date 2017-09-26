export default class GallerySection {
  /**
   * Parses categories and returns sections ordered by date.
   * @param {Object} categories data
   * @return {Object} sections
   */
  static get (categories) {
    let sections = []

    const months = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień'
    ]

    for (var i = 0; i < categories.length; i++) {
      const category = categories[i]

      const date = new Date(category.date)
      const month = date.getMonth()
      const year = date.getFullYear()

      const index = this.getSectionIndex(sections, month, year)

      if (index < 0) {
        sections.push(
          {
            month: month,
            year: year,
            categories: []
          }
        )

        sections[sections.length - 1].categories.push(category)
      } else {
        sections[index].categories.push(category)
      }
    }

    for (var i = 0; i < sections.length; i++) {
      const year = sections[i].year
      const month = months[sections[i].month]
      const actualDate = new Date()
      const actualYear = actualDate.getFullYear()
      const actualMonth = actualDate.getMonth()

      let subHeader = (sections[i].month === actualMonth && year === actualYear) ? 'Ten miesiąc' : month

      if (year !== actualYear) subHeader += ` ${year}`

      sections[i].subheader = subHeader
    }

    return sections
  }

  /**
   * Gets section index.
   * @param {Int} month
   * @return {Int} year
   */
  static getSectionIndex = (sections, month, year) => {
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].month === month && sections[i].year === year) {
        return i
      }
    }

    return -1
  }
}
