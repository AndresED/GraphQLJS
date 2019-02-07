import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './data/resolvers'
const app = express();;
import { typeDefs } from './data/schema';
var ks = require('./key/key');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({ req }) => {
        if (!req.headers["authorization"]) {
            throw new Error("token_required")
        }
        var token = req.headers["authorization"];
        console.log(token)
        try {
            var payload = jwt.decode(token, ks.key_secret);
            if (payload.exp <= moment().unix()) {
                throw new Error("token_expirate")

            }
        } catch (ex) {
            throw new Error("token_invalid")
        }
        req.user = payload;
        resolve(req);
    }
})
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