const path = require('path')
const webpack = require('webpack')
const hljs = require('highlight.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

//MAIN CONFIG
module.exports = {
  entry: {
    vendors: ['./app/scripts/vendors.js'],
    index: ['./app/scripts/index.js'],
    codeSnippet: ['./app/scripts/code-snippet.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      { test: /\.html$/, //HTML file are the partials to be injected into .ejs template
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          }
        ]
      },
      { test: /\.md$/, 
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'markdown-it-loader',
            options: {
              html: true,
              highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                  try {
                    return '<pre class="hljs"><code>' +
                           hljs.highlight(lang, str, true).value +
                           '</code></pre>';
                  } catch (__) {}
                }

                return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: "Digital Marketing Templates",
      filename: 'index.html',
      template: 'app/index.ejs',
      chunksSortMode: 'manual',
      chunks: ['vendors', 'index']
    })
  ]
}
