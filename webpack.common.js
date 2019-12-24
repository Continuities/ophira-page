const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    fancy: './src/fancy-crap.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css',
    }),
    new FaviconsWebpackPlugin('./static/ophira.svg')
  ],
  module: {
    rules: [{
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    },{
      test: /\.gltf$/i,
      use: ['gltf-webpack-loader']
    }, {
      test: /\.(bin|png|gif|jpg)$/i,
      use: ['file-loader']
    }, {
      test: /\.svg$/i,
      use: ['svg-inline-loader']
    }]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};