const { connect } = require('mongoose');

module.exports = async () => {
  await connect('mongodb://localhost/SocialBackEnd', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection;
};