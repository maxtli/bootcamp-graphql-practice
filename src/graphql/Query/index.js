const merge = require('lodash.merge')
const Authors = require('./Authors')
const Books = require('./Books')
const Publishers = require('./Publishers')

const resolvers = [Authors, Books, Publishers]

module.exports = merge(...resolvers)
