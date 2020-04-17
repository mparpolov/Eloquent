const express = require('express');

const StopwordsController = require('./controllers/StopwordsController');
const DigestController = require('./controllers/DigestController');
const HeadlinesController = require('./controllers/HeadlinesController');

const router = express.Router();

router.get('/config/stopwords/', StopwordsController.index);
router.put('/config/stopwords/', StopwordsController.update);

router.get('/news/digest', DigestController.digest);

router.get('/news/headlines', HeadlinesController.headlines);

module.exports = router;