var request = require('supertest');
var server = require ('../server.js');

describe('GET /', function() {
    it('respond with hello world', function(done) {
	request(server).get('/').expect('hello world', done);
    });
});
