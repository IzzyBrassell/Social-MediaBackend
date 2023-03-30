const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  User_Id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    default: 1,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought',
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

// Auto Increment User_Id
UserSchema.pre('save', function (next) {
  const user = this;
  mongoose.model('User', UserSchema).countDocuments((err, count) => {
    if (err) {
      return next(err);
    }
    user.User_Id = count + 1;
    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;