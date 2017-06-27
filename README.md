# Rest API for CHAT
---

Chat API that users simple username/password authentication. <br />
Utilized 'joi' for input sanitization, 'bycrpt' for encryption and HAPIJS server.

# Getting Started


## Prerequisites
mysql <br />
nodejs <br />
npm


### Clone repository 
```
git clone https://github.com/Klaiv/chat_api.git
cd chat_api 
```
### Connect Database
1. Create MySQL database using the dump file database_dump.sql 
2. Configure your .env file in root directory using the example .env.sample [.env.sample](.env.sample) file attached with your database credentials

Create .env file in root using example .env.sample e.g. 
```
DB_HOST=localhost
DB_PASS='yourdbpassword'
DB_USER='yourdbuser'
DB='yourdbname'
```
### Run Server
```
npm install
npm start
```
## Public Endpoints
---
**Register New User**
----
This route allows for anyone to sign up and be able to make requests to the API.
* URL: <br />
`'/register'` 
* Data Params: <br />
`username=[alphanumeric]` <br />
`email=[alphanumeric]`<br /> 
`password=[alphanumeric]`
* Success Response <br />
`{
"fieldCount": 0,
"affectedRows": 1,
"insertId": 6,
"serverStatus": 2,
"warningCount": 0,
"message": "",
"protocol41": true,
"changedRows": 0
}`
* Error Response <br />
`{
"statusCode": 400,
"error": "Bad Request"}`
* Sample Call <br />
```
var request = require("request");
var options = { method: 'POST',
url: 'http://localhost:8000/register',
headers: 
{   'cache-control': 'no-cache',
'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
formData: 
{ username: 'myusername',
email: 'myemail@me.com',
password: 'myPassword' } };
request(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(body);
});
```

**List All Users** 
----
This route lists all the users currently using API.
* URL: <br />
`'/users'` 
* METHOD: <br />
`GET`
* Success Response <br />
`[
{
"user_id": 1,
"username": "myusername",
"email": "tests@me.com"
},
...
]`
* Sample Call <br />
```
var request = require("request");
var options = { method: 'GET',
url: 'http://localhost:8000/users',
headers: 
{  'cache-control': 'no-cache',
'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
formData: { '': '' } };
request(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(body);
});
```

**Search Users**
----
This route allows anyone to search the user list by username or partial username. 
* URL: <br />
`'/users/search/{search_text}'` <br />
or 
search by user_id <br />
`'/user/{user_id}'`
* Method <br />
`GET`
* URL Params: <br />
`{search_text} =[alpanumeric]`
* Success Response <br />
`[
{
"user_id": 1,
"username": "myusername",
"email": "tests@me.com"
}
] `
* Sample Call <br />
```
var request = require("request");
var options = { method: 'GET',
url: 'http://localhost:8000/user/search/user',
headers: 
{ 'cache-control': 'no-cache' } };
request(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(body);
});`
```

## Protected Endpoints
---
**Send Message**
----
This routes allows a registered user send a text message to another user given the other user's user id (to_id).
* URL: <br />
`'/send'` 
* Method <br />
`POST`   
* URL Params: <br />
`to_id=[integer]` <br />
`message=[text]` 
* Data Params: <br />
`username=[integer]` <br />
`password=[string]` 
* Success Response <br />
`{
"fieldCount": 0,
"affectedRows": 1,
"insertId": 9,
"serverStatus": 2,
"warningCount": 0,
"message": "",
"protocol41": true,
"changedRows": 0
}`
* Error Response <br />
`{
"statusCode": 401,
"message": "Unauthorized"
}` <br />
or <br />
`{
"statusCode": 400,
"error": "Bad Request"}`
* Sample Call :  <br />
```
var request = require("request");
var options = { method: 'POST',
url: 'http://localhost:8000/send',
headers: 
{
'cache-control': 'no-cache',
'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
formData: 
{ to_id: '4',
message: 'Send a message to myusername',
username: 'myusername',
password: 'myPassword' } };

request(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(body);
});
```


**Get Messages Inbox**
----
This route allows a user to retrieve all messages he/she received.
* URL: <br />
`'/inbox'`
* Method <br />
`POST`
* Data Params <br />
`username=[integer]` 
`password=[string]` 
* Success Response <br />
`[
{
"message_id": 2,
"message": "Call me back!",
"to_id": 1,
"from_id": 3
},
{
"message_id": 4,
"message": "Good Morning",
"to_id": 1,
"from_id": 4
}
]`
* Error Response <br />
`{
"statusCode": 401,
"message": "Unauthorized"
}` <br />
or <br />
`{
"statusCode": 400,
"error": "Bad Request"}`
* Sample Call <br />
```
var request = require("request");

var options = { method: 'POST',
url: 'http://localhost:8000/inbox',
headers: 
{ 'cache-control': 'no-cache',
'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
formData: { username: 'username', password: 'mypassord' } };

request(options, function (error, response, body) {
if (error) throw new Error(error);

console.log(body);
});
```
**Get Messages Outbox**
----
This route allows a user to retrieve all messages he/she has sent.
* URL: <br />
`'/outbox'`
* Method <br />
`POST`
* Data Params <br />
`username=[integer]` 
`password=[string]`
* Success Response <br />
`[
{
"message_id": 2,
"message": "Call me back!",
"to_id": 1,
"from_id": 3
}
]`
* Error Response <br />
`{
"statusCode": 401,
"message": "Unauthorized"
}` <br />
or <br />
`{
"statusCode": 400,
"error": "Bad Request"}`
* Sample Call <br />

```
var request = require("request");
var options = { method: 'POST',
url: 'http://localhost:8000/outbox',
headers: 
{ 'cache-control': 'no-cache',
'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
formData: { username: 'username', password: 'mypassord' } };
request(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(body);
});
```

**Edit Profile** 
----
* URL : <br />
`'/edit' `
* Data Params: <br />
`email=[alphanumeric]` <br />
`password=[alphanumeric]` <br /> 
`username=[alphanumeric]`
* Success Response <br />
`[
{
"message_id": 2,
"message": "Yeah",
"to_id": 4,
"from_id": 1
},
{
"message_id": 4,
"message": "Okay",
"to_id": 3,
"from_id": 1
}
]`
* Error Response <br />
`{
"statusCode": 401,
"message": "Unauthorized"
}` <br />
or <br />
`{
"statusCode": 400,
"error": "Bad Request"}`
* Sample Call <br />
```
var request = require("request");
var options = { method: 'POST',
url: 'http://localhost:8000/user/edit',
headers: 
{ 'cache-control': 'no-cache',
'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
formData: { username: 'username', password: 'mypassword', email: 'email@test.com' } };
request(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(body);
})
```

**Delete Message** 
----
This route allows a user to delete a message in the inbox.
* URL : <br />
`/message/{message_id}`
* METHOD: <br />
`DELETE`
* Data Params: <br />
`username=[alphanumeric]` <br />
`password=[alphanumeric]` <br />
* Success Response <br />
`{
statusCode: 200,
message: 'Message Deleted',
}`
* Error Response <br />
`{
statusCode: 404,
message: 'Message Not Found',
}` <br />
or <br />
`{
statusCode: 401,
message: 'Unauthorized',
}`
or <br />
`{
"statusCode": 400,
"error": "Bad Request"}`

* Sample Call <br />

```
var request = require("request");
var options = { method: 'DELETE',
url: 'http://localhost:8000/message/6',
headers: 
{ 'cache-control': 'no-cache',
'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
formData: { username: 'myusername', password: 'mypassword' } };
request(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(body);
});
```


## Testing

Run Mocha test
```
npm test
```

## Author

@Clive Mudanda

## License

See the [LICENSE](LICENSE) file for details

