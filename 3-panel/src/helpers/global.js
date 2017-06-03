/**
 * Check that element is visible on the screen.
 * @param {DOMElement} element.
 * @return {Boolean} is visible.
 */
function isVisible (el) {
  var rect = el.getBoundingClientRect()
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  var is = !(rect.bottom < 0 || rect.top - viewHeight >= 0)
  if (is && el.style.display === 'none') is = false
  return is
}
