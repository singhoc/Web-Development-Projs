const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/WrapAsync');
const Campground = require('../models/campground');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const camp = require('../controllers/campgrounds');

router.route('/')
    .get(catchAsync(camp.index))
    .post(isLoggedIn, validateCampground, catchAsync(camp.createCamp));

router.get('/new', isLoggedIn, camp.newCampForm);

router.route('/:id')
    .get(catchAsync(camp.viewCamp))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(camp.updateCamp))
    .delete(isLoggedIn, isAuthor, catchAsync(camp.deleteCamp));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(camp.editCampForm));

module.exports = router;