var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp)



describe('Users', function () {
  it('List All Users', function () {
    server.inject({
  method: 'GET',
  url: '/users'
}, function (res) {
      assert.equal(res.statusCode, 200)
    })
  })
  it('Get User by ID', function () {
    server.inject({
  method: 'GET',
  url: '/user/23'
}, function (res) {
      assert.equal(res.statusCode, 200)
    })
  })
  it('Search User by username', function () {
    server.inject({
  method: 'GET',
  url: '/user/search/{string}'
}, function (res) {
      assert.equal(res.statusCode, 200)
    })
  })
})