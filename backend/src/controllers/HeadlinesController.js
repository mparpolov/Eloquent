const extract = require('../services/Extract');

const HeadlinesController = {
  headlines: async (req, res) => {
    const { source } = req.query;
    const headlines = await extract(source);
    return res.json({ headlines: headlines });
  }
};

module.exports = HeadlinesController;