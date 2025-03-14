const express = require('express')
const cors = require('cors')
<<<<<<< HEAD
// const { App } = require('@slack/bolt')

=======
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b
const mongoose = require('mongoose')
require('express-async-errors')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const config = require('./utils/config')
const userRouter = require('./routes/userRoutes') 
<<<<<<< HEAD
// const routeRouter = require('./routes/routeRoutes')
=======
const routeRouter = require('./routes/routeRoutes')
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b

//connect to db
mongoose.set('strictQuery', false)
logger.info('connecting to MongoDb')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

<<<<<<< HEAD
const expressApp = express()

//middlewares 
expressApp.use(cors())
expressApp.use(express.json())
expressApp.use(middleware.requestLogger)

//routes
expressApp.use('/api/users', userRouter) 
// expressApp.use('/api/routes', routeRouter)

//middlewares
expressApp.use(middleware.unknownEndpoint)
expressApp.use(middleware.errorHandler)

module.exports = expressApp
=======
const app = express()

//middlewares 
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

//routes
app.use('/api/users', userRouter) 
app.use('/api/routes', routeRouter)

//middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b
