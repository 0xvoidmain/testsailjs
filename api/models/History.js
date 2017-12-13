module.exports = {
  attributes: {
    user: {
      model: 'User',
      index: true
    },
    project: {
      model: 'project'
    },
    objectType: 'string',
    action: 'string'
  },
  autoCreatedAt: true,
  autoUpdatedAt: true
}