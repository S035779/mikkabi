const path = require('path');
const Dotenv = require('dotenv-webpack');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['react']
      }
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    port: 8080,
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv()
  ]
};

module.exports = config;
