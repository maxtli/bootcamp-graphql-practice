const Book = require("../../models/Book")
const Author = require('../../models/Author')
const Publisher = require('../../models/Publisher')

const books = async () => {
    try {
        return await Book.query()
    } catch (err) {
        console.log(err)
    }
}

const author = async ({ authorId }, params, context) => {
    try {
        return await Author.query()
        //.select('id', fn('concat', 'firstName', 'lastName'),'age', 'email', 'numBooksPublished', 'createdAt')
        .findOne('id', authorId)
    } catch (err) {
        console.log(err)
    }
}

const publisher = async ({ publisherId }, params, context) => {
    try {
        return await Publisher.query()
        .select('id', 'addressId', 'company as name', 'phoneNumber as phone', 'numBooksPublished')
        .findOne('id', publisherId)
    } catch (err) {
        console.log(err)
    }
}

const resolver = {
    Query: {
        books: books
    },
    Book: {
        author: author,
        publisher: publisher
    }
}

module.exports = resolver