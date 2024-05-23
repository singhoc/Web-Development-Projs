const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/WrapAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, email });
        const regUser = await User.register(user, password);
        req.login(regUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelpcamp');
            res.redirect('/campgrounds');
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}))
router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds'; // update this line to use res.locals.returnTo now
    delete res.locals.returnTo;
    res.redirect(redirectUrl);
})


router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
});

module.exports = router;