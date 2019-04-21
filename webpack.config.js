const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js'),
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 8080,
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' },
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}