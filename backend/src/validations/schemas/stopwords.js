const { celebrate, Segments, Joi } = require('celebrate');

const Stopwords = celebrate({
  [Segments.BODY]: Joi.object().keys({
    word: Joi.string().required()
  })
});

module.exports = Stopwords;