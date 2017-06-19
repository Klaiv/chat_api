'use strict';

var server = require('./server');


var routes = require('./config/routes');

for (var route in routes) {
    server.route(routes[route]);
}


server.start((err) => {
	if (err) {
		throw err;
	}
	console.log('Server running at:', server.info.uri);
});
module.exports = server
