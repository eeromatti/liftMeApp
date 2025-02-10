const axios = require("axios");
const config = require('../utils/config')
const findDistance = require('./findDistance')
const User = require('../models/User')

// req: id, role, home, work, distance
const findMatches = async (id) => {
  try {
    const user = await User.findById(id)
    const { _id, name, home, work, role, distance, passengers, drivers } = user
    // fetch users
    const users = await User.find();

    for (let i = 0; i < users.length; i++) {
        
        // find drivers if role is passenger
        if (role.includes("passenger") && users[i].role.includes("driver") && users[i].id !== id) {
            let driversHome = users[i].home.join(",").toString();
            let passengersHome = home.toString();
            const distanceToPickup = await findDistance(driversHome, passengersHome);
            const distanceToWork = await findDistance(passengersHome, work.toString())
            const totalDistance = distanceToPickup + distanceToWork

            if (totalDistance < 1.2 * users[i].distance) {
                drivers.push(users[i].name)
            }
        }
        
        //find passangers if role is driver
        if (role.includes("driver") && users[i].role.includes("passenger") && users[i].id !== id) {
            let driversHome = home.toString()
            let passengersHome = users[i].home.join(",").toString()
            const distanceToPickup = await findDistance(driversHome, passengersHome);
            const distanceToWork = await findDistance(passengersHome, work.toString())
            const totalDistance = distanceToPickup + distanceToWork

            if (totalDistance < 1.2 * distance) {
                passengers.push(users[i].name)
            }
        }
    }
    return user
    
    } catch (error) {
        console.error("Error in finding matches:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    };
            

module.exports = findMatches;