'use strict';
const hapi = require('hapi');
var server = new hapi.Server();

server.connection({ 
    host: 'localhost', 
    port: 8000 
});
module.exports = server;
