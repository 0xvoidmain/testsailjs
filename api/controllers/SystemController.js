module.exports = {
  'info': (req, res) => {
    res.ok({
      time: new Date(),
      mode: process.env.NODE_ENV
    });
  }
}