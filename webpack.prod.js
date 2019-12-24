const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ophira the Stalker',
      template: './src/template.html',
      inlineSource: '(index.bundle.js|.css)$',
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      'theme-color': '#000000'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ]
});