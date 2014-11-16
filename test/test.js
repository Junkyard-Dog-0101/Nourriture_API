var request = require('supertest');
var server = require('../server.js');

describe('GET /recipes', function () {
    it('should return json containing all recipes', function (done) {
        request(server).get('/').expect('Content-Type', /json/);
    });
});