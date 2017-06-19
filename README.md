# Rest API for CHAT
---

Chat API that users simple username/password authentication

# Getting Started
### Connect Database
1. Create MySQL database using the dump file database_dump.sql 
2. Configure your .env file in root directory using the example .env.sample [.env.sample](.env.sample) file attached with your database credentials
```
DB_HOST=localhost
DB_PASS='yourdbpassword'
DB_USER='yourdbuser'
DB='yourdbname'
```
### Clone repository 
```
cd [repository] 
npm install
npm start 
```




## Prerequisites




## Protected Endpoints
---
**Send Message**
----
This routes allows a registered user send a text message to another user given the other user's user id (to_id).
* URL: 
`'/send'` 
* Method
`POST`   
* URL Params:
* `to_id=[integer]` 
*  `message=[text]` 
* Data Params: 
`username=[integer]` 
`password=[string]` 
* Success Response
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
* Error Response
`{
"statusCode": 401,
"message": "Unauthorized"
}`
or
`{
"statusCode": 400,
"error": "Bad Request"}`
* Sample Call :  
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
* URL: 
`'/inbox'`
* Method
`POST`
* Data Params 
`username=[integer]` 
`password=[string]` 
* Success Response
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
* Error Response
`{
"statusCode": 401,
"message": "Unauthorized"
}`
or
`{
"statusCode": 400,
"error": "Bad Request"}`
* Sample Call
```
var request = require("request");

var options = { method: 'POST',
url: 'http://localhost:8000/messages',
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
* URL: 
`'/outbox'`
* Method
`POST`
* Data Params 
`username=[integer]` 
`password=[string]` 
**Edit Profile** 
* URL : 
`'/edit' `
* Data Params: 
`email=[alphanumeric]`
`password=[alphanumeric]`, 
`username=[alphanumeric]`
* Success Response
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
* Error Response
`{
"statusCode": 401,
"message": "Unauthorized"
}`
or
`{
"statusCode": 400,
"error": "Bad Request"}`
* Sample Call
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
* URL : 
`/message/{message_id}`
* METHOD: 
`DELETE`
* Data Params: 
`username=[alphanumeric]`
`password=[alphanumeric]`
* Success Response
* Error Response
or
`{
"statusCode": 400,
"error": "Bad Request"}`
* Sample Call
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

## Public Endpoints
---
**Register New User**
----
This route allows for anyone to sign up and be able to make requests to the API.
* URL: 
`'/register'` 
* Data Params: 
`username=[alphanumeric]`
`email=[alphanumeric]`, 
`password=[alphanumeric]`
* Success Response
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
* Error Response
`{
"statusCode": 400,
"error": "Bad Request"}`
* Sample Call
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
* URL: 
`'/users'` 
* METHOD: 
`GET`
* Success Response
`[
{
"user_id": 1,
"username": "myusername",
"email": "tests@me.com"
},
...
]`
* Sample Call
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
* URL: 
`'/users/search/{search_text}'`
or search by user_id
`'/user/{user_id}'`
* Method
`GET`
* URL Params: 
`{search_text} =[alpanumeric]`
* Success Response
`[
{
"user_id": 1,
"username": "myusername",
"email": "tests@me.com"
}
] `
* Sample Call
```
var request = require("request");
var options = { method: 'GET',
url: 'http://localhost:8000/user/search/user',
headers: 
{ 'postman-token': '4aa56059-c4c4-3dc3-ebb9-a4c20556e821',
'cache-control': 'no-cache' } };
request(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(body);
});`
```

## Testing

Run Mocha test
```
npm test
```

## Author

@Clive Mudanda

## License

See the [LICENSE.md](LICENSE.md) file for details

