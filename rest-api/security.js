module.exports = isAuthenticated = (req, res) => {
  if (!req.isAuthenticated) {
    return res.send({
      message: 'unauthenticated',
      success: false
    })
  }
}
