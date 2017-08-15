const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'eval-source-map',

  entry: {
    entry: './src'
  },

  node: {
    __dirname: false,
    __filename: false
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },

  devServer: {
    contentBase: './',
    publicPath: 'http://localhost:2002/build/'
  },

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.(png|gif|jpg|woff2|tff)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }, {
        test: /\.(js)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0'],
              plugins: [['transform-jsx', { 'useVariables': true }]]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js']
  }
}
