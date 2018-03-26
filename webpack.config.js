const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractHandlebars = new ExtractTextPlugin({
  allChunks: false,
  filename: 'index.html'
});
const ExtractCss = new ExtractTextPlugin({
  filename: 'style.css',
  disable: false //Remove debug option in case of source map issues
});

module.exports = {
  entry: {
    'index.html': path.resolve('./example/index.hbs'),
    'main.min': path.resolve('./example/main.js'),
    'style.css': path.resolve('./src/sass/_form-handler.scss')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'example')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
      options: {
        presets: [
          'env',
          'stage-2'
        ],
        plugins: ['transform-object-assign']
      }
    },{
      test: /\.scss$/,
      use: ExtractCss.extract({
        use: [{
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }],
        fallback: {
          loader: 'style-loader'
        }
      })
    },{
      test: /\.hbs$/,
      loader: ExtractHandlebars.extract([
        {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }, {
          loader: 'handlebars-entry-loader',
          options: {
            partials: 'src/partials/**/*.hbs',
            helpers: 'helpers/**/*.helper.js',
            data: 'data/_global.json',
            partialNamer: function(helper) {
              return helper.replace('src/partials/', '').replace('.hbs', '');
            },
            helperNamer: function(helper) {
              return helper.replace('helpers/hbs-form-handler/', '').replace('.helper.js', '');
            }
          }
        }
      ])
    }]
  },
  plugins: [
    ExtractHandlebars,
    ExtractCss
  ]
};
