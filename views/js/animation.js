var Animation = class Animation {
  /**
   * Animates given element.
   * @param {DOMElement}
   * @param {Boolean}
   * @param {Int} timeout if flag is true (optional)
   * @param {Object} options and values
   * @param {Int} timeout if flag is false (optional)
   * @param {Int} first option index (optional)
   * @param {Int} second option index (optional)
   * @param {Int} first value index (optional)
   * @param {Int} second value index (optional)
   */
  static animate (element, flag, timeout2 = 200, data = {
    options: [
      'display',
      'opacity'
    ],
    values: {
      'display': [
        'block',
        'none'
      ],
      'opacity': [
        '1',
        '0'
      ]
    }
  }, timeout1 = 10, firstOptionIndex = 0, secondOptionIndex = 1, firstValueIndex = 0, secondValueIndex = 1) {
    const firstOption = data.options[firstOptionIndex]
    const firstOptionValues = data.values[firstOption]

    const secondOption = data.options[secondOptionIndex]
    const secondOptionValues = data.values[secondOption]

    const _option1 = (flag) ? firstOption : secondOption
    const _value1 = (flag) ? firstOptionValues[firstValueIndex] : secondOptionValues[secondValueIndex]

    const _option2 = (flag) ? secondOption : firstOption
    const _value2 = (flag) ? secondOptionValues[firstValueIndex] : firstOptionValues[secondValueIndex]

    // Animate
    element.style[_option1] = _value1.toString()

    setTimeout(() => {
      element.style[_option2] = _value2.toString()
    }, (flag) ? timeout1 : timeout2)
  }
}
