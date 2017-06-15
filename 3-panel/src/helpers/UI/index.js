export default class UI {
  static render (component, rootElement) {
    component._render(rootElement)
  }

  /**
   * Checks that element is visible on screen.
   * @param {DOMElement} element.
   * @param {Boolean} is visible.
   */
  static isVisible (element) {
    let rect = element.getBoundingClientRect()
    let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
    let is = !(rect.bottom < 0 || rect.top - viewHeight >= 0)
    if (is && element.style.display === 'none') is = false
    return is
  }

  /**
   * Gets random number from min and max.
   * @param {Int} min
   * @param {Int} max
   * @return {Int} random number
   */
  static getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
