const Book = require('../../models/Book')
const Publisher = require('../../models/Publisher')
const Address = require('../../models/Address')

const publishers = async () => {
    try {
        return await Publisher.query()
        .select('id', 'addressId', 'company as name', 'phoneNumber as phone', 'numBooksPublished')
    } catch (err) {
        console.log(err)
    }
}

const books = async ({ id }, params, context) => {
    try {
        return await Book.query().where('publisherId', id)
    } catch (err) {
        console.log(err)
    }
}

const address = async ({ addressId }, params, context) => {
    try {
        return await Address.query().findOne('id', addressId)
    } catch (err) {
        console.log(err)
    }
}

const resolvers = {
    Query: {
        publishers: publishers
    },
    Publisher: {
        books: books,
        address: address
    }
}

module.exports = resolvers