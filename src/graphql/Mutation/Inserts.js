const Author = require ('../../models/Author')
const Book = require ('../../models/Book')
const Publisher = require ('../../models/Publisher')

const addAuthor = async (obj, { input: {name: {firstName, lastName}, age, email, numBooksPublished, address: {city, state, street, zip}}}, context) => {
    try {
        return await Author.query().allowGraph('address').insert({
            firstName,
            lastName,
            age,
            email, 
            numBooksPublished,
            address: {
                state,
                city,
                street,
                zip
            }
        }).returning('*')
    } catch (err) {
        console.log(err)
    }
}

const addBook = async (obj, { authorName, publisher, input: {title,language,pages,publishDate}}) => {
    try {
        const author = await Author.query().select('id').findOne(authorName)
        const publish = await Publisher.query().select('id').findOne({company: publisher})
        return await Book.query().insert({
            title, language, numPages: pages, datePublished:publishDate, authorId: author.id, publisherId: publish.id
        }).returning('*')
    } catch (err) {
        console.log(err)
    }
}

const resolvers = {
    Mutation: {
        addAuthor,
        addBook
    }
}

module.exports = resolvers