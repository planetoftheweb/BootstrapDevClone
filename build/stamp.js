const fs   = require('fs')
const path = require('path')
const pkg  = require(path.resolve(__dirname, '../package.json'))
const year = new Date().getFullYear()

const pathBoostrap        = path.resolve(__dirname, '../dist/js/bootstrap.js')
const pathBootstrapBundle = path.resolve(__dirname, '../dist/js/bootstrap.bundle.js')
const contentFile         = fs.readFileSync(pathBoostrap, { encoding: 'UTF8' })
const contentBundleFile   = fs.readFileSync(pathBootstrapBundle, { encoding: 'UTF8' })

const stamp =
`/*!
 * Bootstrap v${pkg.version} (${pkg.homepage})
 * Copyright 2011-${year} ${pkg.author}
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\\'s JavaScript.')
}

(function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 3) || (version[0] >= 4)) {
    throw new Error('Bootstrap\\'s JavaScript requires at least jQuery v3.0.0 but less than v4.0.0')
  }
})(jQuery);
`
fs.writeFileSync(pathBoostrap, `${stamp}${contentFile}`, { encoding: 'UTF8' })
fs.writeFileSync(pathBootstrapBundle, `${stamp}${contentBundleFile}`, { encoding: 'UTF8' })
