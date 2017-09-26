module.exports = isAuthenticated = (req) => {
  if (!req.isAuthenticated) {
    return res.send({
      message: 'unauthenticated',
      success: false
    })
  }
}
