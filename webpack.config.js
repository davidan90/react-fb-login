const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './example/index.html',
  filename: 'index.html',
  inject: 'body'
});

const ReactPluginConfig = new webpack.ProvidePlugin({
  React: 'react',
});

const enviroment = 'dev';

const BASE_CONFIG = {
  target: 'web',
  entry: './example/main.js',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(enviroment),
      }
    }),
  ],
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },

  plugins: [HtmlWebpackPluginConfig, ReactPluginConfig],
}

module.exports = [BASE_CONFIG];