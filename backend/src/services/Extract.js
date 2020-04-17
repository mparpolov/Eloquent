const cheerio = require('cheerio');
const axios = require('axios');

const client = require('../database/redis');

const extract = async url => {
  const res = await axios.get('https://' + url);
  const $ = cheerio.load(res.data);
  const links = $('a');
  // Extract text and hrefs from 'a' tags
  const headlines = await extractHeadlines($, links);
  // Sort lexicographically
  headlines.sort((a, b) => a.text.localeCompare(b.text));
  // Save to redis
  client.set('headlines', headlines);
  return headlines;
};

const extractHeadlines = ($, links) => {
  const headlines = [];
  return new Promise((resolve, reject) => {
    try {
      $(links).each((i, link) => {
        // Process link href
        let href = $(link).attr('href');
        if ( href ) {
          href = href.split(',')[0]; // Get address only
        }
        // Process link text
        let text = '';
        if ( $(link).children().length > 0 ) { // If children, extract text from all children
          const children = $(link).children();
          for ( let i = 0; i < children.length; i++ ) {
            text = $(children[i]).text().replace(/[\t\n\.]/g, '').trim();
            if ( text ) {
              text.concat(text, ' ');
            }
          }
        } else { // All text is directly on the 'a' tag
          text = $(link).text().replace(/[\n\t]/g, '').trim();
        }
        if ( text && text.split(' ').length > 3 ) { // Grab headlines with more than 3 words
          headlines.push({
            text: text, 
            link: href
          });
        }
        return resolve(headlines);
      });
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = extract;