const express = require('express');

const app = express();
const routes = require('./routes');

const setupDB = require('./database/setup');
setupDB();

app.use(express.json());

app.use(routes);

app.use('/', (req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

module.exports = app;