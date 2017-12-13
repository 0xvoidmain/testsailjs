var path = require('path');
var webpack = require('webpack');
module.exports = require('./webpack.config.js');
module.exports.plugins.push(
  new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
);