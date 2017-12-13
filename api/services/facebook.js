const axios = require('axios');

module.exports = {
  getUserByToken: function(token, callback) {
    const url = 'https://graph.facebook.com/me' +
      "?access_token=" + token +
      "&fields=id,name,email&format=json";
    return axios.get(url)
      .then(({data}) => {
        return data;
      });
  }
}