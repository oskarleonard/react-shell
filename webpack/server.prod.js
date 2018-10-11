const path = require('path');
const webpack = require('webpack');
const { getAll, getServer } = require('./sharedConfig');

const res = (p) => path.resolve(__dirname, p);

const BUILT_ASSETS_FOLDER = '/static/';

const entry = res('../src/server/render.js');
const output = res('../build_prod/server');

module.exports = Object.assign({}, getAll(), getServer(), {
  mode: 'production',
  entry: [entry],
  output: {
    path: output,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: BUILT_ASSETS_FOLDER,
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      'process.env.SERVER': JSON.stringify(true),
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
});
