const express = require('express')
const CollectionsService = require('./collections-service')
const collectionsRouter = express.Router();

collectionsRouter
    .route('/')
    .get((req, res, next) => {
        //assign req.query to a constant
        const {main_liquor} = req.query;
        //validation for get request
        if (!main_liquor) {
            return res.status(400).json({ error: { message: `Oops, main liquor is required.` }})
        }
        const knexInstance = req.app.get('db');
        CollectionsService.getByMainLiquor(
            knexInstance, main_liquor
        )
        .then(recipes => {
            if (!recipes) {
                return res.status(404).json({ error: { message: `There are no recipes for ${main_liquor}.` }})
            }
            res
                //send 200-OK status
                .status(200)
                //send json response of recipes search result
                .json(recipes)
        })
        .catch(next)
    })

module.exports = collectionsRouter