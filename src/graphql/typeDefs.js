const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    authors(input: authorStatsInput): [Author!]
    author(input: authorNameInput!): Author! 
    publishers: [Publisher]!
    books: [Book!]!
  }
  type Mutation {
    addAuthor(input: authorInput): Author!
    addBook(authorName: authorNameInput!, publisher: String!, input: bookInput): Book
  }
  type Book {
    title: String!
    language: String!
    pages: Int
    publishDate: String
    author: Author!
    publisher: Publisher!
  }
  type Publisher {
    name: String!
    phone: String!
    numBooksPublished: Int
    address: Address!
    books: [Book!]
  }
  type Author {
    firstName: String!
    lastName: String!
    age: Int
    email: String
    numBooksPublished: Int
    createdAt: String
    address: Address
    books: [Book!]
  }
  type Address {
    street: String!
    city: String!
    state: String!
    zip: String!
  }
  input addressInput {
    street: String!
    city: String!
    state: String!
    zip: String!
  }
  input bookInput {
    title: String!
    language: String!
    pages: Int
    publishDate: String
  }
  input authorInput {
    name: authorNameInput!
    age: Int
    email: String
    numBooksPublished: Int
    address: addressInput!
  }
  input authorNameInput {
    firstName: String!
    lastName: String!
  }
  input authorStatsInput {
    ageMin: Int
    ageMax: Int
    numBooksPublishedMin: Int
    numBooksPublishedMax: Int
  }
`
