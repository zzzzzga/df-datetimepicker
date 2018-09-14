const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, './dist'),//输出路径，就是上步骤中新建的dist目录，
    publicPath: '/dist/',
    filename: 'bundle.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devtool: '#cheap-module-eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = '#cheap-module-source-map'
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }))
} else {
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  config.plugins.push(new HtmlWebpackPlugin({
    template: 'example/index.html',
    filename: 'index.html'
  }))
}

module.exports = config
