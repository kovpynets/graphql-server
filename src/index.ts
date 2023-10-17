import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import dotenv from 'dotenv';
dotenv.config();

const typeDefs = `#graphql

type Book {
    title: String
    author: String
}

type Query {
    books: [Book]
}
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) },
});

console.log(`🚀 Server listening at: ${url}`);
