const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getAll, getClient } = require('./sharedConfig');

const res = (p) => path.resolve(__dirname, p);
const entryFile = res('../src/client/client.js');
const outputFolder = res('../build_prod/client');
const outputFileName = '[name].[chunkhash].js';

const BUILT_ASSETS_FOLDER = '/static/';

module.exports = Object.assign({}, getAll(), getClient(), {
  mode: 'production',
  devtool: 'source-map',
  entry: [entryFile],
  output: {
    filename: outputFileName,
    chunkFilename: outputFileName,
    path: outputFolder,
    publicPath: BUILT_ASSETS_FOLDER,
  },
  stats: 'verbose',
  plugins: [
    new ExtractCssChunks({
      filename: '[name].[contenthash].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../.env'),
      systemvars: true,
      safe: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)
  ],
});
