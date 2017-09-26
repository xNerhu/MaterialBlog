const addZero = (d) => {
  return (d < 10) ? ('0' + d) : d
}

const format = (date) => {
  const dateObject = new Date(date)

  return `${addZero(dateObject.getDate())}.${addZero(dateObject.getMonth() + 1)}.${dateObject.getFullYear()} ${addZero(dateObject.getHours())}:${addZero(dateObject.getMinutes())}`
}

module.exports = {
  format: format
}
