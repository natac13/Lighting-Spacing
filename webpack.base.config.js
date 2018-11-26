const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BUILD_PATH = path.resolve(__dirname, 'build');
const ENTRY_PATH = path.resolve('./app', 'index.js');

module.exports = (env) => {
  const { PLATFORM } = env;
  const devMode = PLATFORM !== 'production';
  return merge([
    {
      context: path.resolve(__dirname),  // absolute path for resolving entry point(s)
      devtool: devMode ? 'inline-source-map': 'source-map',
      entry: [
        // sets up an ES6-ish environment with promise support
        '@babel/polyfill',
        // webpack-hot-middleware needs this
        // 'webpack-hot-middleware/client',
        // the main application script
        ENTRY_PATH,
      ],
      output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
        publicPath: '/', // where the generated static files reside.
      },
      devServer: {
        contentBase: './build/',
        overlay: true,
      },
      resolve: {
        alias: {  // can do import Main from Components/Main/; instead of full path
          App: path.resolve(__dirname, 'app'),
          Actions: path.resolve(__dirname, 'app', 'actions'),
          Components: path.resolve(__dirname, 'app', 'components'),
          Containers: path.resolve(__dirname, 'app', 'containers'),
          Constants: path.resolve(__dirname, 'app', 'constants'),
          Middleware: path.resolve(__dirname, 'app', 'middleware'),
          Utils: path.resolve(__dirname, 'app', 'utils'),
        },
        extensions: ['*', '.js', '.jsx', '.json', '.node', '.png', '.css', '.scss', '.sass']
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            }
          },
          {
            test: /\.scss$/,
            use: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: true,
                  camelCase: true,
                  localIdentName: '[local]__[hash:base64:9]',
                  importLoaders: 1
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  data: `@import "${path.resolve(__dirname, 'app/stylesheets/theme.scss')}";`,
                },
              },
            ]
          },
        ]
      },
      plugins: [
        new CleanWebpackPlugin(['build']),
        new CopyWebpackPlugin([
          { from: 'app/static' },
          { from: './favicon.ico' },
        ]), // copys assets, like photos to the output folder.
        new HtmlWebpackPlugin({
          template: './app/index.html',
          filename: './index.html',
          favicon: './favicon.ico'
        }),
        // new FaviconsWebpackPlugin('./favicon.ico'),
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(env.VERSION),
          'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
        })
      ]
    }
  ])
};
