'use strict';

const {
  Router
} = require('express');
const router = new Router();

const Place = require('./../models/place');

router.get('/', (req, res, next) => {
  Place.find()
    .then(places => {
      res.render('index', {
        places
      });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', (req, res, next) => {
  const {
    name,
    type,
    latitude,
    longitude
  } = req.body;
  Place.create({
      name,
      type,
      location: {
        coordinates: [longitude, latitude]
      }
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Place.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      res.render('edit', {
        place
      });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    type
  } = req.body;
  Place.findByIdAndUpdate(id, {
      name,
      type
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id).then(place => {
    res.render('single', {
      place
    });
  });
});

module.exports = router;