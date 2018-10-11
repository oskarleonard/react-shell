require('dotenv').config();
const zlib = require('zlib');
const express = require('express');
const compression = require('compression');
const { app } = require('../src/server/server');
const clientConfig = require('../webpack/client.prod');

const {
  output: { publicPath },
} = clientConfig;
const outputPath = clientConfig.output.path;

const clientStats = require('../build_prod/client/stats.json'); // eslint-disable-line
const serverRender = require('../build_prod/server/server.js').default;

app.use(publicPath, express.static(outputPath));
app.use(
  compression({ flush: zlib.constants.Z_PARTIAL_FLUSH }),
  serverRender({ clientStats })
);

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening @ http://localhost:${process.env.APP_PORT}/`);
});
