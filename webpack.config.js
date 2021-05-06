const path = require('path');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    index: './dist/cjs/src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'maptoolz.js',
    library: 'MapToolz',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
};