'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var ks = require('../key/key');
var UserController = require("../controllers/user");

function ensureAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: "La cabecera no tiene la cabecera de autenticación"
        })
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    //console.log("token recibido:", token);
    try {
        var payload = jwt.decode(token, ks.key_secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: "token_expirate"
            })
        }
    } catch (ex) {
        return res.status(404).send({
            message: "token_invalid"
        })
    }
    req.user = payload;
    next();
}
module.exports = {
    ensureAuth,
}