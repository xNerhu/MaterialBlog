const getActualDate = function () {
  const date = new Date()

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
}

module.exports = {
  getActualDate: getActualDate
}
