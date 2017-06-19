var validate = require('joi');
var Bcrypt = require('bcrypt');
const connection = require('../../db');
module.exports = [
{
	method: 'POST',
	path: '/inbox',
	handler: function(request, reply) {
		const username = request.payload.username;
		const password = request.payload.password;
		connection.query('SELECT user_id, password, email FROM users WHERE username = "' + username + '"', function(error, results, fields) {
			if (error) throw error;
			var user_id = results[0].user_id;
			var isValid = Bcrypt.compareSync(password, results[0].password);
			if (isValid) {
				connection.query('SELECT * FROM messages WHERE to_id = "' + user_id + '"', function(error, results, fields) {
					if (error) throw error;
					reply(results);
				});
			} else {
				reply({
					statusCode: 401,
					message: 'Unauthorized',
				});
			}
		});
	},
	config: {
		validate: {
			payload: {
				username: validate.string().required(),
				password: validate.string().required()
			}
		}
	}
},
{
	method: 'POST',
	path: '/outbox',
	handler: function(request, reply) {
		const username = request.payload.username;
		const password = request.payload.password;
		connection.query('SELECT user_id, password, email FROM users WHERE username = "' + username + '"', function(error, results, fields) {
			if (error) throw error;
			var user_id = results[0].user_id;
			var isValid = Bcrypt.compareSync(password, results[0].password);
			if (isValid) {
				connection.query('SELECT * FROM messages WHERE from_id = "' + user_id + '"', function(error, results, fields) {
					if (error) throw error;
					reply(results);
				});
			} else {
				reply({
					statusCode: 401,
					message: 'Unauthorized',
				});
			}
		});
	},
	config: {
		validate: {
			payload: {
				username: validate.string().required(),
				password: validate.string().required()
			}
		}
	}
},
{
	method: 'POST',
	path: '/send',
	handler: function(request, reply) {
		const to_id = request.payload.to_id;
		const message = request.payload.message;
		const username = request.payload.username;
		const password = request.payload.password;
		connection.query('SELECT user_id, password, email FROM users WHERE username = "' + username + '"', function(error, results, fields) {
			if (error) throw error;
			var from_id = results[0].user_id;
			var isValid = Bcrypt.compareSync(password, results[0].password);
			//        reply(results);
			if (isValid) {
				connection.query('INSERT INTO messages (message,to_id, from_id) VALUES ("' + message + '","' + to_id + '","' + from_id + '" )', function(error, results, fields) {
					if (error) throw error;
					console.log(results);
					reply(results);
				});
			} else {
				reply({
					statusCode: 401,
					message: 'Unauthorized',
				});
			}
		});
	},
	config: {
		validate: {
			payload: {
				to_id: validate.number()
					.integer().required(),
				username: validate.string().required(),
				password: validate.string().required(),
				message: [validate.string().required(), validate.number().required()]
			}
		}
	}
}, 
{
	method: 'DELETE',
	path: '/message/{message_id}',
	handler: function(request, reply) {
		const message_id = request.params.message_id;
		const username = request.payload.username;
		const password = request.payload.password;
		connection.query('SELECT user_id, password, email FROM users WHERE username = "' + username + '"', function(error, results, fields) {
			if (error) throw error;
			var user_id = results[0].user_id;
			var isValid = Bcrypt.compareSync(password, results[0].password);
			if (isValid) {
				connection.query('DELETE FROM messages WHERE to_id = "' + user_id + '"AND message_id = "' + message_id + '"', function(error, result, fields) {
					if (error) throw error;
					if (result.affectedRows) {
						reply({
						statusCode: 200,
						message: 'Message Deleted',
					});
					} else {
						reply({
						statusCode: 404,
						message: 'Message Not Found',
					});
					}
				});
			} else {
				reply({
					statusCode: 401,
					message: 'Unauthorized',
				});
			}
		});
	},
	config: {
		validate: {
			params: {
				
				message_id: validate.number()
					.integer().required()
			},
			payload: {
				username: validate.string().required(),
				password: validate.string().required()}
		}
	}
}];