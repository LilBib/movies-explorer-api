const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URLregex, idRegex } = require('../utils/constants');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      // eslint-disable-next-line no-useless-escape
      link: Joi.string().required().pattern(URLregex, 'link'),
    }),
  }),
  createMovie,
);
router.get('/', getMovies);
router.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().pattern(idRegex, 'id'),
    }),
  }),
  deleteMovie,
);

module.exports = router;
