/* eslint-disable no-undef */
require('dotenv').config()

<<<<<<< HEAD
=======
let SLACK_BOT_TOKEN=process.env.SLACK_BOT_TOKEN
let SLACK_SIGNING_SECRET=process.env.SLACK_SIGNING_SECRET
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b
let ORS_API_KEY=process.env.ORS_API_KEY
let PORT=process.env.PORT
let SERVER_ADDRESS=process.env.SERVER_ADDRESS
let MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
<<<<<<< HEAD
let SECRET = process.env.SECRET

let SLACK_SIGNING_SECRET=process.env.SLACK_SIGNING_SECRET
let SLACK_BOT_TOKEN=process.env.SLACK_BOT_TOKEN
let SLACK_APP_TOKEN=process.env.SLACK_APP_TOKEN

module.exports = {
  ORS_API_KEY,
  PORT,
  SERVER_ADDRESS,
  MONGODB_URI,
  SLACK_SIGNING_SECRET,
  SLACK_BOT_TOKEN,
  SLACK_APP_TOKEN,
  SECRET
=======

module.exports = {
  SLACK_BOT_TOKEN,
  SLACK_SIGNING_SECRET,
  ORS_API_KEY,
  PORT,
  SERVER_ADDRESS,
  MONGODB_URI
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b
}
