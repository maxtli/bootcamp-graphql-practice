const merge = require('lodash.merge')
const Inserts = require('./Inserts')

const resolvers = [Inserts]

module.exports = merge(...resolvers)
