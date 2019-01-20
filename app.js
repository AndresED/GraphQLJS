import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileupload from 'express-fileupload';
import morgan from 'morgan';
import graphqlHTTP from 'express-graphql';
import { schema } from './data/schema';
var app = express();
app.use(morgan('dev'));

//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
//para que retorno datos en formato JSON y acepte un tamaño limite de peticiones
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileupload())
    //CORS
app.use(cors());
app.get('/', (req, res) => {
    return res.status(200).send({
        mensaje: "Hola Mundo"
    });
});
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

module.exports = app;