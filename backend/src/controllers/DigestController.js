const digest = require('../services/Digest');

const DigestController = {
  digest: async (req, res) => {
    const { exclude } = req.body;
    if ( exclude ) {
      const keywords = await digest(exclude);
      return res.json({ keywords: keywords });
    }
    return res.status(400).json({ message: 'Bad request.' });
  }
};

module.exports = DigestController;