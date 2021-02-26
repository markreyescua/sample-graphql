const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Feed {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        feeds: [Feed!]
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type UserMutation {
        createUser(userInputData: UserInputData): User!
    }
    
    type UserQuery {
        hello: String!
    }

    schema {
        query: UserQuery
        mutation: UserMutation
    }
`);
