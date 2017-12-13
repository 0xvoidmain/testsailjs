var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    client: './frontend/client/app.js',
    admin: './frontend/admin/app.js'
  },
  output: {
    path: path.join(__dirname, "frontend/assets/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      { test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader" },
      { test: /\.css$/, loader: ["style-loader", "css-loader"] }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue': 'vue/dist/vue.min.js'
    }
  },
  plugins: []
};