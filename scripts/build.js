const shell = require('shelljs');

shell.echo('Cleaning up old files...');
shell.exec('rimraf build_prod');
shell.mkdir('build_prod');
shell.echo('\nCompiling...');
shell.echo('[1/2]\twebpack/server.prod.js');
shell.exec(
  './node_modules/webpack/bin/webpack.js --progress -p --config webpack/server.prod.js'
);

shell.echo('[2/2]\twebpack/client.prod.js');
shell.exec(
  './node_modules/webpack/bin/webpack.js --progress -p --config webpack/client.prod.js'
);

shell.echo('\nDone!');
