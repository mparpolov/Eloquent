const { celebrate, Segments, Joi } = require('celebrate');

const Digest = celebrate({
  [Segments.BODY]: Joi.object().keys({
    exclude: Joi.array().min(1).items(Joi.string())
  })
});

module.exports = Digest;