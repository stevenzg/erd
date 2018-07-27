const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/erd.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'erd.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: './src/erd.html',
    inject: true,
    filename: './erd.html'}),
    new ExtractTextPlugin('erd.css'),
    // new CopyWebpackPlugin([
    //   { from: 'index.js', to: 'erd.js' },
    // ]),
    new CleanWebpackPlugin(['dist'])
  ]
}