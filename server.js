const express = require('express');
const connection = require('./config/connection');
const routes = require('./controllers')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(routes)

connection.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });