const express = require('express');
const { errors } = require('celebrate');
const routes = require('./routes');

const setupDB = require('./database/setup');
setupDB();

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

app.use('/', (req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

module.exports = app;