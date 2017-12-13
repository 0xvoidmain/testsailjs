module.exports = {
  attributes: {
    user: {
      model: 'User',
      index: true
    },
    fromUser: {
      model: 'User'
    },
    content: {
      type: 'string',
      defaultsTo: ''
    },
    project: {
      model: 'Project'
    },
    objectType: 'string',
    action: 'string',
    isRead: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  autoCreatedAt: true,
  autoUpdatedAt: true
}