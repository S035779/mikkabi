const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: path.resolve(__dirname, 'src')
  , entry: {
    app:        './main'
    , note:     './note'
    , conplete: './complete'
    , products: './products'
    , vender:   [
      'react'
      , 'react-dom'
      , 'react-router-dom'
    ]}
  , target: "atom"
  , output: {
    path: path.resolve(__dirname, 'public')
    , filename: '[name].bundle.js'
  }
  , module: {
    rules: [{
      test: /\.js$/
      , loader: 'babel-loader'
      , options: {
        presets: ['react', ['es2015', { modules: false }]]
      }}
    , {
      test: /\.css$/
      , use: ExtractTextPlugin.extract({
        use: [ 'css-loader','postcss-loader']
      })
    }]}
  , devServer: {
    contentBase: path.join(__dirname, 'public')
    , host: '0.0.0.0'
    , port: 8080
    , watchContentBase: true
    , inline: true
  }
  , devtool: 'source-map'
  , plugins: [
    new Dotenv()
    , new ExtractTextPlugin('[name].css')
    , new webpack.optimize.UglifyJsPlugin({
      warnings:  false
      , sourceMap: false
      , mangle:    true
    })
    , new webpack.optimize.CommonsChunkPlugin({
      name:       'vender'
      , filename: 'vender.js'
      , minChunk: Infinity
    })
  ]
};
module.exports = config;
