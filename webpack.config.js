var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path');

module.exports = {
  devtool: 'source-map',
  context: __dirname + '/src',
  entry: {
    index: './app.tsx'
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Typescript Bouncing Balls Demo',
      template: 'index.ejs',
      inject: 'body'
    })
  ]
}
