const postrecipe = require('../src/postrecipe/postrecipe-router')
const knex = require('knex')
const app = require('../src/app')
  
describe('POST Endpoint', () => {
    
    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    before('cleanup', () => db('collections').truncate())
    afterEach('cleanup', () => db('collections').truncate())   
    after('disconnect from db', () => db.destroy())

    it('Successfully posts a drink recipe given valid data', () => {

    })

})