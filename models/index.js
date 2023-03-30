const mongoose = require('mongoose');

// Importing the User and Thought models
const User = require('./User');
const Thought = require('./Thought');

// Establishing the database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Defining the relationships between the models
User.hasMany(Thought, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Thought.reactions, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Thought.belongsTo(User, {
  foreignKey: 'user_id',
});

Thought.reactions.belongsTo(User, {
  foreignKey: 'user_id',
});

User.belongsToMany(User, {
    as: 'friends',
    foreignKey: 'user_id'
  });



// Exporting the models
module.exports = {
  User,
  Thought,
};