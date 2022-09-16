const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const NoRightsError = require('../errors/NoRightsError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    // eslint-disable-next-line max-len
    .then((movies) => res.send({ data: movies.filter((movie) => movie.owner.toString() === req.user._id) }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  // eslint-disable-next-line max-len, object-curly-newline
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;

  Movie.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при добавлении фильма'));
      }
      return next(err);
    });
};
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => next(new NotFoundError('Фильм с указанным _id не найден')))
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(movie._id)
          // eslint-disable-next-line no-shadow
          .then((movie) => res.send({ data: movie }))
          .catch(next);
      } else {
        return next(new NoRightsError('Нельзя удалять чужие сохраненные фильмы!'));
      }
    })
    .catch(next);
};
