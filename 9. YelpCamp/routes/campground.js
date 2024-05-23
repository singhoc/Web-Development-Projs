const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/WrapAsync');
const Campground = require('../models/campground');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    //if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400)
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully created new campground');

    res.redirect(`/campgrounds/${campground._id}`);
}));

router.get('/new', isLoggedIn, catchAsync(async (req, res) => {
    res.render('campgrounds/new');
}));

router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'//for populating author reviews
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(req.params.id);

    res.render(`campgrounds/edit`, { campground });
}));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/campgrounds');
}))

module.exports = router;