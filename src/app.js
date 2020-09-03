require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./middleware/error-handler')
const postRecipeRouter = require('./postrecipe/postrecipe-router')
const collectionsRouter = require('./collections/collections-router')
const app = express()

const allowedOrigins = ['http://localhost:3000', 'https://bottoms-up-client.vercel.app/']
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not' + 'allow access from the specified Origin'
        return callback(new Error(msg), false)
    }
    return callback(null, true)
}}))

//testing endpoint
app.get('/', (req, res) => {
    res.send('Hello, world!')
})
// path '/postrecipe' , route handler function postRecipeRouter
app.use('/postrecipe', postRecipeRouter)
// path '/collections' , route handler function collectionsRouter
app.use('/collections', collectionsRouter)

//error handler middleware
app.use(errorHandler)

module.exports = app