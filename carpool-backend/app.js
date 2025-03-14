const express = require('express')
const cors = require('cors')
// const { App } = require('@slack/bolt')

const mongoose = require('mongoose')
require('express-async-errors')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const config = require('./utils/config')
const userRouter = require('./routes/userRoutes') 
// const routeRouter = require('./routes/routeRoutes')

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