//import 
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require('axios');

//server logic type for Defining the type of the api or the server
async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
          type User {
              id: ID!
              name: String!
              username: String!
              email: String!
              phone: String!
              website: String!
          }
          type Todo {
              id: ID!
              title: String!
              completed: Boolean
              user: User
          }
          type Query {
              getTodos: [Todo]
              getAllUsers: [User]
              getUser(id: ID!): User
          }
        `,
        //the resolver is used here to give logic for how to fetch the api 
        resolvers: {
            Todo: {
                user: async (todo) =>
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data,
            },
            Query: {
                getTodos: async () =>
                    (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUsers: async () =>
                    (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUser: async (parent, { id }) =>
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            }
        },
    });
    await server.start();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/graphql', expressMiddleware(server));
    app.listen(8000, () => console.log('Server Started at PORT 8000'));
}

startServer();
