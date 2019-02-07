'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var ks = require('../key/key');

function createToken(user) {
    var key_secret = ks.key_secret;
    var payload = {
        sub: user._id,
        usuario: user.usuario,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }
    return jwt.encode(payload, key_secret);
}
module.exports = {
    createToken,
}