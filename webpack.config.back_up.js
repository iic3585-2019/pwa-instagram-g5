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
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 8080,
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' },
  },
  watch: true,
  plugins: [
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
    }),
    new HtmlWebpackPlugin({
      title: 'Prod app'
    })
  ],
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