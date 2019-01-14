import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileupload from 'express-fileupload';
import morgan from 'morgan';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
const app = express();
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
    res.send('Todo Listo');
});

const root = {
    hola: () => {
        return "Hola mundo desde GraphQL";
    }
}


app.get('/graphql', graphqlHTTP({
    schema: schema,
    //El resolve se pasa cmo rootvalue
    rootValue: root,
    graphiql: true,
}));