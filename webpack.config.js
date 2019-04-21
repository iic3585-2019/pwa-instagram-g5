const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js'),
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: '/assets/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }
  },
  plugins: [
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
}