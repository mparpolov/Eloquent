const mongoose = require('mongoose');

const Stopword = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  stopwords: [String]
});

module.exports = mongoose.model('Stopwords', Stopword);