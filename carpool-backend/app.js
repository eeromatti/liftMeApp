const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')

const config = require('./utils/config')
const userRouter = require("./routes/userRoutes"); 
const routeRouter = require("./routes/routeRoutes")

//connect to db
mongoose.set('strictQuery', false)
const url =
  `mongodb+srv://eki:${config.MONGODB_PW}@mangodb.ml2nd.mongodb.net/liftMeApp?retryWrites=true&w=majority`
console.log('connecting to MongoDb')
mongoose.connect(url)
    .then(result => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

  
  
//   note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   })



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter); 
app.use("/api/routes", routeRouter)

app.get("/", (req, res) => {
    res.send("Hello world!");
});

module.exports = app;