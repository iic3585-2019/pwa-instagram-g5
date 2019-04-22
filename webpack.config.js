const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js'),
    // styles: path.resolve(__dirname, 'src', 'styles', 'style.css')
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: '/assets/',
    filename: '[name].js'
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
      // exclude: [/styles\.js$/] // Only for dev
      // exclude: [/app.js$/] // Only for dev
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin([
      // path.resolve(__dirname, 'src', 'example.txt'),
      path.resolve(__dirname, 'src', 'manifest.json'),
      path.resolve(__dirname, 'src', 'images'),
      path.resolve(__dirname, 'src', 'firebase-messaging-sw.js'),
      { from: path.resolve(__dirname, 'src', 'styles', 'style.css'), to: path.resolve(__dirname, 'build') }
    ])
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