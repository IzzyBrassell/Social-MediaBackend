const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    User_Id: {
        type: Number,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  thoughts: [{
    type: mongoose.Schema.Types.Number,
    ref: 'Thought',
  }],
  friends: [{
    type: mongoose.Schema.Types.Number,
    ref: 'User',
  }],
});


const User = mongoose.model('User', UserSchema);

module.exports = User;