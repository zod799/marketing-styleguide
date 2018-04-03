const merge = require('webpack-merge');
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin('styles/[name].css');

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
          {loader:'babel-loader'}
        ]
      },
      { test: /(\.css|\.scss)$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
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
                sourceMap: true,
                outputStyle: 'compact'
              }
            }
          ],
          publicPath: '../'
        })
      },
      { test: /\.(png|svg|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {name: 'images/[name].[ext]'}
          }
        ]
      },
      { test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name (file) {
                let folderName = [path][0].dirname(file);
                folderName = folderName.slice(61);
                folderName = folderName.split('/');
                return 'fonts/'+folderName[0]+'.[name].[ext]'
              }
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    extractSass,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    // Uncomment if need to analyze
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),
  ]
});
