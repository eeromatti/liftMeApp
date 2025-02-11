const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const config = require('./utils/config')
const userRouter = require('./routes/userRoutes') 
const routeRouter = require('./routes/routeRoutes')

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