const Book = require("../../models/Book")
const Author = require('../../models/Author')
const Publisher = require('../../models/Publisher')

const books = async () => {
    try {
        return await Book.query().select('title', 'language', 'numPages as pages', 'datePublished as publishDate', 'authorId', 'publisherId')
    } catch (err) {
        console.log(err)
    }
}

const author = async ({ authorId }, params, context) => {
    try {
        //return {firstName: authorId, lastName: 'hi'}
        //console.log(JSON.stringify(cool))
        return await Author.query().where('id', authorId).first()//.findOne('id', authorId)
        //.select('id', fn('concat', 'firstName', 'lastName'),'age', 'email', 'numBooksPublished', 'createdAt')
        
    } catch (err) {
        console.log(err)
        return {firstName: 'Too many database connections :(', lastName: 'Too many database connections :('}
    }
}

const publisher = async ({ publisherId }, params, context) => {
    try {
        return await Publisher.query()
        .select('id', 'addressId', 'company as name', 'phoneNumber as phone', 'numBooksPublished')
        .findOne('id', publisherId)
    } catch (err) {
        console.log(err)
        return {firstName: 'Too many database connections :(', lastName: 'Too many database connections :('}
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