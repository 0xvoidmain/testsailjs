module.exports = {
  attributes: {
    user: {
      model: 'User',
      index: true
    },
    project: {
      model: 'Project',
      index: true
    }
  },
  autoCreatedAt: true,
  autoUpdatedAt: true
}