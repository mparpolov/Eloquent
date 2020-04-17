const mongoose = require('mongoose');
const url = 'mongodb://mongo-server:27017/eloquent';

const client = require('../database/redis');

const Stopwords = require('../models/stopwords');

const StopwordsController = {
  index: async (req, res) => {
    const stopwords = await client.get('stopwords');
    return res.json({ stopwords: stopwords });
  },
  update: async (req, res) => {
    const { word } = req.body;
    if (word) {
      await mongoose.connect(url, { useNewUrlParser: true });
      const result = await Stopwords.findOne({}, 'stopwords');
      if ( 'stopwords' in result ) {
        const { _id, stopwords } = result;
        if ( ! stopwords.includes(word) ) {
          stopwords.push(word);
          await Stopwords.collection.updateOne({ _id: _id }, { 
            $set: { stopwords: stopwords }
          });
          // Update redis
          client.set('stopwords', stopwords);
          res.json({ message: 'Word added successfuly.' });
        } else {
          res.json({ message: 'Word on list already.' });
        }
      } else {
        res.json({ message: 'Service unavailable.' });
      }
    } else {
      res.json({ message: 'Please, provide a word.' });
    }
    mongoose.connection.close();
  }
};

module.exports = StopwordsController;