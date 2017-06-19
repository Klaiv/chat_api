var validate = require('joi');

var Bcrypt = require('bcrypt');
const connection = require('../../db');
module.exports = [
	{
		method: 'GET',
		path: '/users',
		config: {
			handler: function(request, reply) {
				connection.query('SELECT user_id, username, email FROM users', function(error, results, fields) {
					if (error) throw error;
					reply(results);
				});
			}
		}
 },
	{
		method: 'GET',
		path: '/user/{user_id}',
		config: {
			validate: {
				params: {
					user_id: validate.number()
						.integer(),
				}
			},
			handler: function(request, reply) {
				const user_id = request.params.user_id;
				connection.query('SELECT user_id, username, email FROM users WHERE user_id = "' + user_id + '"', function(error, results, fields) {
					if (error) throw error;
					reply(results);
				});
			}
		}
	},
	{
		method: 'GET',
		path: '/user/search/{username}',
		config: {
			validate: {
				params: {
					username: validate.string(),
				}
			},
			handler: function(request, reply) {
				const username = request.params.username;
				var string = "%" + username + "%";
				connection.query('SELECT user_id, username, email FROM users WHERE username LIKE  "' + string + '"', function(error, results, fields) {
					if (error) throw error;
					reply(results);
				});
			}
		}
	},
	{
		method: 'POST',
		path: '/user/edit',
		handler: function(request, reply) {
			const username = request.payload.username;
			const email = request.payload.email;
			const password = request.payload.password;
			connection.query('SELECT user_id, password, email FROM users WHERE username = "' + username + '"', function(error, results, fields) {
				if (error) throw error;
				var user_id = results[0].user_id;
				var isValid = Bcrypt.compareSync(password, results[0].password);
				if (isValid) {
					connection.query('UPDATE users SET email= "' + email + '" WHERE user_id = "' + user_id + '"', function(error, results, fields) {
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
					username: validate.string().required(),
					email: validate.string()
						.email().required(),
					password: validate.string().required()
				}
			}
		}
	},
	{
		method: 'POST',
		path: '/register',
		handler: function(request, reply) {
			const username = request.payload.username;
			const email = request.payload.email;
			const password = request.payload.password;
			var salt = Bcrypt.genSaltSync();
			var encrypted = Bcrypt.hashSync(password, salt);
			connection.query('INSERT INTO users (username,email,password) VALUES ("' + username + '","' + email + '","' + encrypted + '")', function(error, results, fields) {
				if (error) throw error;
				console.log(results);
				reply(results);
			});
		},
		config: {
			validate: {
				payload: {
					username: validate.string().required(),
					email: validate.string()
						.email().required(),
					password: validate.string().required()
				}
			}
		}
	}
];