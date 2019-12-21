const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '[Dev] Ophira',
    }),
  ],
  module: {
    rules: [{
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },{
      test: /\.gltf$/i,
      use: ['gltf-webpack-loader']
    }, {
      test: /\.(bin|png|gif|jpg)$/i,
      use: ['file-loader']
    }]
  },
  output: {
    filename: 'ophira.js',
    path: path.resolve(__dirname, 'dist'),
  },
};