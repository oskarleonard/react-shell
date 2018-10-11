const path = require('path');
const res = (p) => path.resolve(__dirname, p);
const postcssPresetEnv = require('postcss-preset-env');

// Merged In
// Webpack config shared among all webpack files
function getAll() {
  return {
    resolve: {
      extensions: ['.js'],
      modules: [path.resolve(__dirname, '..', 'src', 'client'), 'node_modules'],
      alias: {
        '@client': path.resolve(__dirname, '..', 'src', 'client'),
        '@server': path.resolve(__dirname, '..', 'src', 'server'),
      },
    },
  };
}

// Merged In
function getClient() {
  const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

  return {
    name: 'client',
    target: 'web',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            ExtractCssChunks.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [postcssPresetEnv()],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                data:
                  '@import "' +
                  res('../src/client/shared/styles/globals.scss') +
                  '";' +
                  ' $node-env: ' +
                  process.env.NODE_ENV +
                  ';',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|jpeg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]_[hash].[ext]',
                outputPath: 'images/',
              },
            },
          ],
        },
      ],
    },
  };
}

// Merged In
function getServer() {
  const postcssPresetEnv = require('postcss-preset-env');

  return {
    name: 'server',
    target: 'node',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'css-loader/locals',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [postcssPresetEnv()],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                data:
                  '@import "' +
                  res('../src/client/shared/styles/globals.scss') +
                  '";' +
                  ' $node-env: ' +
                  process.env.NODE_ENV +
                  ';',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|jpeg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]_[hash].[ext]',
                outputPath: 'images/',
              },
            },
          ],
        },
      ],
    },
  };
}

module.exports = {
  getAll,
  getClient,
  getServer,
};
