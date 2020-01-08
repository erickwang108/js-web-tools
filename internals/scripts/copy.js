const path = require('path');
const shell = require('shelljs');

shell.exec('npm run build');

const libPath = path.resolve('./lib');
const destPath = path.resolve('../react-waves/node_modules/js-web-tools');
if (process.platform === 'win32') {
  shell.exec(`rd/s/q ${destPath}`);
  shell.exec(`mkdir -p ${destPath}`);
  shell.exec(`copy package.json ${destPath}`);
  shell.exec(`copy README.md ${destPath}`);
  shell.exec(`xcopy ${libPath} ${destPath}/s`);
} else {
  shell.exec(`rm -rf ${destPath}`);
  shell.exec(`mkdir -p ${destPath}`);
  shell.exec(`cp package.json ${destPath}`);
  shell.exec(`cp README.md ${destPath}`);
  shell.exec(`cp -rf ${libPath} ${destPath}`);
}

console.log('node_modules are copied');
