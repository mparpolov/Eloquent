const digest = require('../services/Digest');

const DigestController = {
  digest: async (req, res) => {
    const { exclude } = req.body;
    const keywords = await digest(exclude);
    return res.json({ keywords: keywords });
  }
};

module.exports = DigestController;