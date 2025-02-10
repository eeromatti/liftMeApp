require('dotenv').config()

let SLACK_BOT_TOKEN=process.env.SLACK_BOT_TOKEN
let SLACK_SIGNING_SECRET=process.env.SLACK_SIGNING_SECRET
let ORS_API_KEY=process.env.ORS_API_KEY
let PORT=process.env.PORT
let SERVER_ADDRESS=process.env.SERVER_ADDRESS
let MONGODB_PW=process.env.MONGODB

module.exports = {
    SLACK_BOT_TOKEN,
    SLACK_SIGNING_SECRET,
    ORS_API_KEY,
    PORT,
    SERVER_ADDRESS,
    MONGODB_PW
}
