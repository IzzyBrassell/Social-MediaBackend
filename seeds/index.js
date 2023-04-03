const mongoose = require('mongoose');
const User = require('../models/user');
const Thought = require('../models/thought');
const userData = require('./users.json');
const thoughtData = require('./thoughts.json');

const connectToDatabase = require('../config/connection');

const seedDatabase = async () => {
  try {
    await connectToDatabase();

    await User.deleteMany({});
    const users = await User.create(userData);
    console.log(`${users.length} users created!`);

    await Thought.deleteMany({});
    const thoughts = await Thought.create(thoughtData);
    console.log(`${thoughts.length} thoughts created!`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();