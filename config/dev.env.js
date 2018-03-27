'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://partner-test.zmlearn.com:8081"',
  HOST: '"http://partner-test.zmlearn.com:8081"'
})
