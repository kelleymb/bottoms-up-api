const postrecipe = require('../src/postrecipe/postrecipe-router')
const knex = require('knex')
const app = require('../src/app')
const supertest = require('supertest')
const { expect } = require('chai')
  
describe('POST Endpoint', () => {
    let db
    
    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    before('cleanup', () => db('collections').truncate())
    afterEach('cleanup', () => db('collections').truncate())   
    after('disconnect from db', () => db.destroy())

    context('Given a new recipe', () => {
        it('Successfully posts a drink recipe given valid data', (done) => {
                const newRecipe = {
                    drink_name: 'Great Gatsby',
                    main_liquor: 'Vodka',
                    ingredients: `1 oz Vitzellen Vodka
                    1 oz Lillet Blanc
                    2 1/2 oz Fresh Grapefruit Juice
                    Garnish: Orange Slice`,
                    instructions: 'Fill mixing glass halfway with ice. Add vodka, Lillet Blanc, and grapefruit juice. Stir until cold. Strain into ice-filled glass. Garnish with orange slice.',
                }
                return supertest(postrecipe)
                    .post('/postrecipe')
                    .send(newRecipe)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.include.keys('id', 'drink_name', 'ingredients', 'instructions', 'created');
                        expect(res.body.drink_name).to.equal(newRecipe.drink_name);
                        expect(res.headers.location).to.equal(`/postrecipe/${res.body.id}`)
                    }, done())
            });
    })
    context('Given a an object key is null', () => {
        it('Responds with a 400 when an drink_name key is missing', (done) => {
            const drink_name_null = {
                drink_name: null,
                main_liquor: 'Vodka',
                ingredients: `1 oz Vitzellen Vodka
                1 oz Lillet Blanc
                2 1/2 oz Fresh Grapefruit Juice
                Garnish: Orange Slice`,
                instructions: 'Fill mixing glass halfway with ice. Add vodka, Lillet Blanc, and grapefruit juice. Stir until cold. Strain into ice-filled glass. Garnish with orange slice.',
            }
                return supertest(postrecipe)
                    .post('/postrecipe')
                    .send(drink_name_null)
                    .expect(400, done())
        });
    });
    context('Given an object key is null', () => {
        it('Responds with a 400 when an main_liquor key is missing', (done) => {
            const main_liquor_null = {
                drink_name: 'Great Gatsby',
                main_liquor: null,
                ingredients: `1 oz Vitzellen Vodka
                1 oz Lillet Blanc
                2 1/2 oz Fresh Grapefruit Juice
                Garnish: Orange Slice`,
                instructions: 'Fill mixing glass halfway with ice. Add vodka, Lillet Blanc, and grapefruit juice. Stir until cold. Strain into ice-filled glass. Garnish with orange slice.',
            }
            return supertest(postrecipe)
                .post('/postrecipe')
                .send(main_liquor_null)
                .expect(400, done())
        });
    });
    context('Given an object key is null', () => {
        it('Responds with a 400 when an ingredients key is missing', (done) => {
            const ingredients_null = {
                drink_name: 'Great Gatsby',
                main_liquor: null,
                ingredients: `1 oz Vitzellen Vodka
                1 oz Lillet Blanc
                2 1/2 oz Fresh Grapefruit Juice
                Garnish: Orange Slice`,
                instructions: 'Fill mixing glass halfway with ice. Add vodka, Lillet Blanc, and grapefruit juice. Stir until cold. Strain into ice-filled glass. Garnish with orange slice.',
            }
            return supertest(postrecipe)
                .post('/postrecipe')
                .send(ingredients_null)
                .expect(400, done())
        });  
    });
    context('Given an object key is null', () => {
        it('Responds with a 400 when an instructions key is missing', (done) => {
            const instructions_null = {
                drink_name: 'Great Gatsby',
                main_liquor: 'Vodka',
                ingredients: `1 oz Vitzellen Vodka
                1 oz Lillet Blanc
                2 1/2 oz Fresh Grapefruit Juice
                Garnish: Orange Slice`,
                instructions: null,
            }
            return supertest(postrecipe)
                .post('/postrecipe')
                .send(instructions_null)
                .expect(400, done())
        });  
    });
})