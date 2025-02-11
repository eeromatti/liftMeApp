const express = require('express')
const User = require('../models/User')
const findDistance = require('../services/findDistance')
const findMatches = require('../services/findMatches')

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
  }
})


// create an user
userRouter.post('/', async (req, res) => {
  const { name, home, work, role, drivers, passengers } = req.body

  // find the commuting distance
  let dis = await findDistance(home, work)

  const user = new User({ name, home, work, role, dis, drivers, passengers })
  if (user) {
    await user.save()
    res.status(201).json({ message: 'User created!', name })
  } else {
    res.status(400).json()
  }   
})


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