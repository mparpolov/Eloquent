const extract = require('../services/Extract');

const HeadlinesController = {
  headlines: async (req, res) => {
    const { source } = req.query;
    if ( source ) { 
      const headlines = await extract(source);
      return res.json({ headlines: headlines });
    }
    return res.status(400).json({ message: 'Bad request.' });
  }
};

module.exports = HeadlinesController;