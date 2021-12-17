const supertest = require('supertest');
const { request } = require('../server');
const server = require('../server');
const requestSupertest = supertest(server);


// describe( "Auth", () => {
//   before( () => {
//     console.log( "before executes once before all tests" );
//   } );

//   after( () => {
//     console.log( "after executes once after all tests" );
//   } );
// })

describe('"/" api test', () => {
    it('GET "/" should send "Up and running" ', (end) => {
        requestSupertest.get('/')
        .expect('Up and running')
        .end(end);
    })
})

