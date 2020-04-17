const mongoose = require('mongoose');
const url ='mongodb://mongo-server:27017/eloquent';

const client = require('./redis');

const Stopwords = require('../models/stopwords');

const setupDB = async () => {
  await mongoose.connect(url, { useNewUrlParser: true });
  // Initialize stopwords
  let stopwords;
  if ( await Stopwords.exists() ) {
    const result = await Stopwords.findOne({}, 'stopwords');
    if ( 'stopwords' in result ) {
      stopwords = result.stopwords;
    }
  } else {
    stopwords = require('./stopwords'); // Base stopwords list
    await Stopwords.createCollection();
    await Stopwords.collection.insertOne({ stopwords: stopwords });
  }
  mongoose.connection.close();
  // Add to redis
  client.set('stopwords', stopwords);
};

module.exports = setupDB;