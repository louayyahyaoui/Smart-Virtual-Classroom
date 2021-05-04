
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-semantic-ui-datepickers.cjs.production.min.js')
} else {
  module.exports = require('./react-semantic-ui-datepickers.cjs.development.js')
}
