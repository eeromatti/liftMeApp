const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false},
  passwordHash: { type: String, required: true},
  role: { 
    type: [String],
    enum: ['driver', 'passenger'], 
    required: true 
  },
  homeAddress: { type: String, required: true},
  homeCoordinates: { type: [Number], required: true},
  workAddress: { type: String, required: true},
  workCoordinates: { type: [Number], required: true},
  distance: { type: Number, required: true },
  time: { type: Number, required: true },
  passengers: { type: [Object], default: [] },
  drivers: { type: [Object], default: [] },
  photo: { type: String, required: false },
  activeDays: { type: [String], default: []}
}, { timestamps: true })

  
const User = mongoose.model('User', UserSchema)
  
module.exports = User