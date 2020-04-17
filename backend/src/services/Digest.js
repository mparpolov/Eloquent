const client = require('../database/redis');

const digest = (exclude = []) => {
  return new Promise(async (resolve, reject) => {
    const keywords = {};

    const stopwords = await client.get('stopwords');
    const headlines = await client.get('headlines');
    
    // Count keyword occurence
    for ( let headline of headlines ) {
      for ( let word of headline.text.split(' ') ) {
        word = word.replace(/[',]/g, '').toLowerCase().trim();
        if ( word && !stopwords.includes(word) && !exclude.includes(word) ) {
          keywords[word] = keywords[word] === undefined ? 1 : keywords[word] + 1;
        }
      }
    }
    // Sort keywords from most used to less used
    let entries = Object.entries(keywords);
    let keywordsSorted = entries.sort((a, b) => b[1] - a[1]);

    resolve(keywordsSorted);
  });
};

module.exports = digest;