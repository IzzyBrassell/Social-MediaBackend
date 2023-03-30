const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: Number,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  reactionBody: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: mongoose.Schema.Types.Number,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toISOString(),
  },
});

const ThoughtSchema = new mongoose.Schema({
    Thought_Id: {
        type: Number,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toISOString(),
  },
  username: {
    type: mongoose.Schema.Types.Number,
    ref: 'User',
    required: true,
  },
  reactions: [reactionSchema],
});



const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;