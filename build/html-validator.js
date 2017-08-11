#!/usr/bin/env node

/*!
 * Script to validate our HTML files.
 * Copyright 2017 The Bootstrap Authors
 * Copyright 2017 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/* eslint-env shelljs */

'use strict'

require('shelljs/make')
config.fatal = false

const path = require('path')
const async = require('async')

const VALIDATOR = path.join(__dirname, '../node_modules/.bin/html-validator')
const GH_PAGES_DIR = path.join(__dirname, '../_gh_pages/')

const files = find(GH_PAGES_DIR + '**/*.html')

async.each(files, (file) => {
  const f = path.normalize(file)

  echo(`Running: html-validator --file=${f}`)
  exec(`${VALIDATOR} --file=${f} --verbose --ignore='Error: Element “img” is missing required attribute “src”.' --ignore='Warning: The “main” role is unnecessary for element “main”.'`)
})
