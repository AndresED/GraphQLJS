import app from './app';
var server = require('http').Server(app);
//server.Server(app);
var port = 8579;
//var db = require('./models');
server.listen(port, function() {
    //sequelize.sync()
    console.log('Servidor corriendo en http://localhost:' + port);
});