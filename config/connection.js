const { connect, connection } = require('mongoose');

connect('mongodb://localhost/SocialBackEnd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;