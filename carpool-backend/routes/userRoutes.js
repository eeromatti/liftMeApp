const express = require('express')
<<<<<<< HEAD
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const findDistanceAndTime = require('../services/findDistanceAndTime')
const findMatchesById = require('../services/findMatchesById')
const findMatchesByBody = require('../services/findMatchesByBody')
const config = require('../utils/config')
// const addressToCoordinates = require('../services/addressToCoordinates')
=======
const User = require('../models/User')
const findDistance = require('../services/findDistance')
const findMatches = require('../services/findMatches')
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b

const userRouter = express.Router()

// find all users
userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})


// find user by id
userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) 
    res.json(user)
  else {
    res.status(404).json()
  } 
})


// update user information
userRouter.put('/:id', async (req, res) => {  
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (user) {
    res.json({ message: 'User updated', user })    
  } else {
    res.status(404).json()
  }
})


<<<<<<< HEAD
// update matches by id
userRouter.put('/matches/:id', async (req, res) => {
  try {
    console.log('kutsutaan matches routea käyttäjälle:', req.params.id)
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    findMatchesById(req.params.id)
      .then(matches => {
        // console.log('drivers:', matches.drivers)
        // console.log('passengers:', matches.passengers)
        if (!matches) return
        return User.findByIdAndUpdate(req.params.id, matches, { new: true })
      })
      .then(newUser => {
        if (newUser) {
          console.log('User successfully updated:', newUser.name)
          res.status(200).json({ message: 'Matches updated'})
        }
      })
      .catch(error => console.error('Error updating matches:', error))

  } catch (error) {
    console.error('Error in updating matches:', error)
    res.status(500).json({ message: 'Internal server error' })
=======
// update matches
userRouter.put('/matches/:id', async (req, res) => {
  // does user exist
  const user = await User.findById(req.params.id)
  if (!user) {
    res.json()
  } 

  // find matches
  const matches = await findMatches(req.params.id, { new: true })
  if (matches) {
    
    // update user
    const newUser = await User.findByIdAndUpdate(req.params.id, matches, { new: true })
    if (newUser) {
      res.json({ message: 'User updated', user })
    } 
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b
  }
})


// create an user
<<<<<<< HEAD
userRouter.post('/signup', async (req, res) => {
  const { name, email, role, homeAddress, homeCoordinates, workAddress, workCoordinates, password, activeDays} = req.body

  // hash the password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // find the commuting distance
  let distance, time
  if (homeCoordinates && workCoordinates) {
    const distanceAndTime = await findDistanceAndTime(homeCoordinates, workCoordinates)
    distance = distanceAndTime[0]
    time = distanceAndTime[1]
  } else {
    console.error('homeCoordinates and workCoordinates are not available or they are incorrect')
  }

  // find matches
  let driversAndPassengers = await findMatchesByBody({name, role, homeCoordinates, workCoordinates, distance, time })

  // create a db object
  const user = new User(
    { name, 
      email,
      role, 
      homeAddress, 
      homeCoordinates, 
      workAddress, 
      workCoordinates, 
      distance, 
      time, 
      drivers: driversAndPassengers[0], 
      passengers:  driversAndPassengers[1],
      passwordHash,
      activeDays
    })

=======
userRouter.post('/', async (req, res) => {
  const { name, home, work, role, drivers, passengers } = req.body

  // find the commuting distance
  let dis = await findDistance(home, work)

  const user = new User({ name, home, work, role, dis, drivers, passengers })
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b
  if (user) {
    await user.save()
    res.status(201).json({ message: 'User created!', name })
  } else {
    res.status(400).json()
  }   
})

<<<<<<< HEAD
// login
userRouter.post('/login', async (req, res) => {
  // console.log('login router vastaa')
  // console.log('req.body:', req.body)
  const {email, password } = req.body
  // console.log('email:', email)
  
  const user = await User.findOne({ email })
  // console.log('user:', user)
  const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid email or password'
    })
  }

  const userForToken = {
    username: user.email,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET)

  res.status(200).send({ token, user })
})

=======
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b

// delete an user
userRouter.delete('/:id', async (req, res) => {  
  const user = await User.deleteOne({ _id: req.params.id })
  if (user) {
    res.json({ message: 'User deleted', user })
  } else {
    res.json()
  }
})


module.exports = userRouter