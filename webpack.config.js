var webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: [`${SRC_DIR}/index.jsx`],
  output:{
    path : `${DIST_DIR}`, 
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        include: SRC_DIR,
        loader: "file-loader?name=assets/[name].[ext]"
      },
    ]
  }
};