import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './data/resolvers'
const app = express();;
import { typeDefs } from './data/schema'
const server = new ApolloServer({ typeDefs, resolvers })
app.use(morgan('dev'));
//CORS
app.use(cors());
app.get('/', (req, res) => {
    return res.status(200).send({
        mensaje: "Hola Mundo"
    });
});
server.applyMiddleware({ app })
module.exports = app;