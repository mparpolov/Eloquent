const express = require('express');

const StopwordsController = require('./controllers/StopwordsController');
const DigestController = require('./controllers/DigestController');
const HeadlinesController = require('./controllers/HeadlinesController');

const stopwordsValidator = require('./validations/schemas/stopwords');
const headlinesValidator = require('./validations/schemas/headlines');
const digestValidator = require('./validations/schemas/digest');

const router = express.Router();

router.get('/config/stopwords/', StopwordsController.index);
router.put('/config/stopwords/', stopwordsValidator, StopwordsController.update);

router.post('/news/digest', digestValidator, DigestController.digest);

router.get('/news/headlines', headlinesValidator, HeadlinesController.headlines);

module.exports = router;