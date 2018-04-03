const merge = require('webpack-merge');
const path = require('path')

//webpack common config file
const common = require('./webpack.common.js');

module.exports = merge(common, {
  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        include: [
          path.resolve(__dirname, 'app')
        ],
        exclude: [
          path.resolve(__dirname, 'app/scripts/libs')
        ],
        use: [
          {loader:'babel-loader'},
          {loader:'eslint-loader'}
        ]
      },
      { test: /(\.css|\.scss)$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {loader: 'resolve-url-loader'},
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      { test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/i,
        include: [
          path.resolve(__dirname, 'app')
        ],
        loader: 'file-loader'
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: "0.0.0.0",
    https: true,
    noInfo: true, // set to false to see output info
    useLocalIp: true
  },
});
