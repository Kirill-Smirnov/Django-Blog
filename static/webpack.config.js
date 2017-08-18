const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: './dist',
    filename: "all.js"
  },
  resolve : {
    extension : ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      // {
      //   loader: 'babel-loader',
      //   query : {
      //     presets : ["es2015"]
      //   }
      // }
    ]
  }
}