const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: "./example/index.js",
  output: {
    path: path.resolve(__dirname, './dist'),//输出路径，就是上步骤中新建的dist目录，
    publicPath: '/dist/',
    filename: 'bundle.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'example/index.html',
      filename: 'index.html'
    })
  ],
  devtool: '#cheap-module-eval-source-map'
}

module.exports = config
