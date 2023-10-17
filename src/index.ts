import { ApolloServer } from '@apollo/server';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';

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
    plugins: [
        process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault()
            : ApolloServerPluginLandingPageLocalDefault({ embed: false }),
    ],
});

const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) },
});

console.log(`🚀 Server listening at: ${url}`);
