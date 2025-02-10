const express = require("express");
const User = require('../models/User')
const findDistance = require('../services/findDistance')
const findMatches = require('../services/findMatches')

const router = express.Router();

// find all users
router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// find user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update user information
router.put("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json({ message: "User updated", user });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// update matches
router.put("/matches/:id", async (req, res) => {
    try {
        const response = await findMatches(req.params.id, { new: true });
        const user = await User.findByIdAndUpdate(req.params.id, response, { new: true })
        res.json({ message: "User updated", user });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// create an user
router.post("/", async (req, res) => {
try {
    const { name, home, work, role, distance, drivers, passengers } = req.body;

    const start = home.join(",")
    const end = work.join(",")
    let dis = await findDistance(start, end)
    
    const user = new User({ name, home, work, role, dis, drivers, passengers });
    await user.save();
    res.status(201).json({ message: "User created!", name });
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// delete an user
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted", user });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;  