const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Hacky way of quickly loading in .babelrc as JSON
const babelOptions = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'));
// Turn off babel module transpilation for react-hot-loader
babelOptions.presets[0][1].modules = false;
babelOptions.presets.push('react');
babelOptions.plugins.unshift('react-hot-loader/babel');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, 'app/client/index.jsx'),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/computeOrder': 'http://localhost:8081',
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'VizworX Code Exercise',
      template: path.resolve(__dirname, 'app/client/index.html'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        },
      },
      { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(gif|ttf|eot|svg|woff2?)$/, use: 'url-loader?name=[name].[ext]' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
};
