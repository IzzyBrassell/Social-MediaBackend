const express = require('express');
const router = express.Router();
const Thought = require('../models/thought');
const User = require('../models/user');


router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('user').populate('reactions');
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('user');
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
    } else {
      res.json(thought);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
    try {
      const { thoughtText, userId } = req.body;
      const thought = await Thought.create({ thoughtText, user: userId });
      await User.findByIdAndUpdate(userId, { $addToSet: { thoughts: thought._id } });
      res.status(201).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

router.put('/:id', async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedThought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(updatedThought);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(deletedThought);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



module.exports = router;