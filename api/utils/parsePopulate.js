module.exports = function(req) {
  requestQuery = req.query || {};
  var populate = requestQuery.populate;
  if (!populate) {
    return [];
  }

  if (typeof populate == 'string') {
    populate = populate.trim();
    return populate.split(',').map(e => e.trim()).filter(e => e);
  }

  if (Array.isArray(populate)) {
    return populate;
  }

  return [];
}