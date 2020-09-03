const express = require('express')
const path = require('path')
const xss = require('xss')
const PostRecipeService = require('./postrecipe-service')
const postRecipeRouter = express.Router()
const jsonParser = express.json()

//use serializeRecipe to sanitize user inputs
//using xss dependency
const serializeRecipe = recipe => ({
    id: recipe.id,
    drink_name: xss(recipe.drink_name),
    main_liquor: xss(recipe.main_liquor),
    ingredients: xss(recipe.ingredients),
    instructions: xss(recipe.instructions),
    created: recipe.created
})

postRecipeRouter    
    .route('/')
    .post(jsonParser, (req, res, next) => {
        //assign req.body to a constant
        const {drink_name, main_liquor, ingredients, instructions} = req.body;
        const newRecipe = {drink_name, main_liquor, ingredients, instructions};
        //validations for req.body
        //if there is no drink_name, main_liquor, ingredients, or instructions
        //send a 400 HTTP Status, with an error message
        if (!drink_name) {
            return next({ status: 400, message: 'Drink name is required' })
        }
        if (!main_liquor) {
            return next({ status: 400, message: 'Main liquor name is required' })
        }
        if (!ingredients) {
            return next({ status: 400, message: 'Ingredients for this recipe are required' })
        }
        if (!instructions) {
            return next({ status: 400, message: 'Instructions for this recipe are required' })
        }
        const knexInstance = req.app.get('db');
        PostRecipeService.insertRecipe(
            knexInstance, newRecipe
        )
        .then(recipe => {
            res
                //send 201 Created HTTP status
                .status(201)
                //update location header with recipe id
                .location(path.posix.join(req.originalUrl, `/${recipe.id}`))
                //sanitize recipe
                .json(serializeRecipe(recipe))
        })
        .catch(next)
    })


module.exports = postRecipeRouter
