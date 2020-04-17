const { celebrate, Segments, Joi } = require('celebrate');

const Headlines = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    source: Joi.string().required()
  })
});

module.exports = Headlines;