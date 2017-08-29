const path    = require('path')
const resolve = require('rollup-plugin-node-resolve')
const BUNDLE  = process.env.BUNDLE === 'true'

var fileDest  = 'bootstrap.js'
var external  = ['jquery', 'popper.js']
const plugins = []
const globals = {
  jquery: '$',
  'popper.js': 'Popper'
}

if (BUNDLE) {
  fileDest = 'bootstrap.bundle.js'
  // remove last entry in external array ton bundle Popper
  external.pop()
  delete globals['popper.js']
  plugins.push(resolve())
}

module.exports = {
  input: path.resolve(__dirname, '../js/src/index.js'),
  output: {
    file: path.resolve(__dirname, `../dist/js/${fileDest}`),
    format: 'iife'
  },
  name: 'bootstrap',
  external: external,
  globals: globals,
  plugins: plugins
}
