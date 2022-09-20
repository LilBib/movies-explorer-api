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
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.string().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(URLregex, 'link'),
      trailer: Joi.string().required().pattern(URLregex, 'link'),
      thumbnail: Joi.string().required().pattern(URLregex, 'link'),
      movieId: Joi.string().required().pattern(idRegex, 'id'),
    }),
  }),
  createMovie,
);
router.get('/', getMovies);
router.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().required().hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
