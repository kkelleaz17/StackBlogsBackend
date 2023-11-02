const express = require('express');
const router = express.Router();
const Users = require('../models/Users'); // Import your Users model
const Hasher = require('../Hash'); // Import your password hashing module

router.post('/Create', async (req, res) => {
  try {
    const { Email, Password, Name } = req.body;

    const existingUser = await Users.findOne({ Email });

    if (existingUser) {
      res.json({ error: 'User with this email already exists' });
      return;
    } else {
      const Hashed = await Hasher.Hash(Password);
      const newUser = await new Users({ Email, Password: Hashed, Name }).save();
      res.json(newUser);
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/GetProfile/:id', async (req, res) => {
  try {
    var AllUsers = await Users.findById(req.params.id)
    res.json(AllUsers);
  } catch (error) {
    res.json({ error: error.message });
  }
})


router.post('/login', async (req, res) => {
  const { Email, Password, Name } = req.body;
  try {
    const user = await Users.findOne({ Email });
    
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await Hasher.unHash(Password, user.Password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

router.get('/GetUserProfiles', async (req, res) => {
  try {
    var AllUsers = await Users.find();
  
    res.json(AllUsers);
  } catch (error) {
    res.json({ error: error.message });
  }
});


router.put('/SaveProfile', async (req, res) => {
  try {
    const userid = req.body._id;
    const updatedData = req.body;

    const updatedUser = await Users.findByIdAndUpdate(userid, updatedData, { new: true });

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

module.exports = router;
