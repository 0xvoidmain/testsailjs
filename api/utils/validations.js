module.exports = {
  email(s) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(s);
  },

  password(s) {
    if (typeof s != 'string') {
      return false;
    }

    if (s.length < 6) {
      return false;
    }

    return true;
  }
}