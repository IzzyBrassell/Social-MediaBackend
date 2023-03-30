const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
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
        required: true,
        unique: true,
        index: true,
        default: 1,
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
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

ThoughtSchema.pre('save', function (next) {
    const thought = this;
    mongoose.model('Thought', ThoughtSchema).countDocuments((err, count) => {
      if (err) {
        return next(err);
      }
      thought.Thought_Id = count + 1;
      next();
    });
  });

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;