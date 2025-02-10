const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    home: { type: [String], required: true},
    work: { type: [String], required: true},
    role: { 
      type: [String],
      enum: ["driver", "passenger"], 
      required: true 
    },
    distance: { type: Number, required: false }, 
    passengers: { type: [String], default: [] },
    drivers: { type: [String], default: [] }, 
  }, { timestamps: true });
  
  const User = mongoose.model("User", UserSchema);
  
  module.exports = User;