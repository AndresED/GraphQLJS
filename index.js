import mongoose from 'mongoose';
var app = require('./app');
var server = require('http').Server(app);
var port = 8579;
//var db = require('./models');
mongoose.connect('mongodb://localhost/clientes', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error en conexion:'));
db.once('open', () => {
    console.log('Mongoose - conexion exitosa');
    server.listen(port, function() {
        //sequelize.sync()
        console.log('Servidor corriendo en http://localhost:' + port);
    });
});