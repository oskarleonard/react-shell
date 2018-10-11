const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin'); // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { getAll, getClient } = require('./sharedConfig');

const res = (p) => path.resolve(__dirname, p);
const entryFile = res('../src/client/client.js');
const outputFolder = res('../build_dev/client');
const outputFile = '[name].js';

const BUILT_ASSETS_FOLDER = '/static/';

module.exports = Object.assign({}, getAll(), getClient(), {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    entryFile,
  ],
  output: {
    filename: outputFile,
    chunkFilename: outputFile,
    path: outputFolder,
    publicPath: BUILT_ASSETS_FOLDER,
  },
  plugins: [
    new WriteFilePlugin(),
    new ExtractCssChunks({ hot: true, reloadAll: true, cssModules: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, '..', '.env'),
      safe: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
