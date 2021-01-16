
const Author = require('../../models/Author')
//const {fn,ref} = require('objection')
const Book = require('../../models/Book')
const Address = require('../../models/Address')

const authors = async (obj, {ageMin, ageMax, numBooksPublishedMin, numBooksPublishedMax}, context) => {
    try {
        const authors = await Author.query()
            //.select('id', fn('concat', 'firstName', 'lastName'),'age', 'email', 'numBooksPublished', 'createdAt')
            .whereBetween('age', [ageMin || 0, ageMax || 100])
            .andWhereBetween('numBooksPublished', [numBooksPublishedMin || 0, numBooksPublishedMax || 100])
        return authors
    }
    catch (err) {
        console.log(err)
    }
}

const author = async (obj, { input: {firstName, lastName} }, context) => {
    try {
        const author = await Author.query()
        //.select(ref(fn('concat', 'firstName', 'hi')).as('firstName')).first()
            .findOne({firstName : firstName, lastName: lastName})
        return author
    } catch (err) {
        console.log(err)
    }
}

const address = async ({ addressId }, params, context) => {
    try {
        const address = await Address.query().findOne('id', addressId).select('street', 'city', 'state', 'zip')
        return address
    } catch (err) {
        console.log(err)
    }
}

const books = async ({ id }, params, context) => {
    try {
        const books = await Book.query().where('authorId', id)
        return books
    } catch (err) {
        console.log(err)
    }
}

const resolver = {
    Query: {
        authors: authors,
        author: author,
    },
    Author: {
        address: address,
        books: books
    },
}

module.exports = resolver