const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const Joi = require('joi');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const campgroundRoutes = require('./routes/campground'); //for campground routes
const reviewRoutes = require('./routes/reviews'); //for reviews routes
const userRoutes = require('./routes/users');//for users login routes

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("connected to mongoose");
}
const db = mongoose.connection;

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //for accessing views forlder

app.use(express.urlencoded({ extended: true })); //for accessing req.body from forms
app.use(methodOverride('_method'));//method overide for delete, update
app.use(express.static(path.join(__dirname, 'public')));//serving static files

const sessionConfig = {
    secret: 'this should be a better secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //expiry for session
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));//for authentication of user
passport.serializeUser(User.serializeUser());//for storing users in session
passport.deserializeUser(User.deserializeUser());//for removing 


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');//for checking and passing any flash messages
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong'
    res.status(statusCode).render('error', { err });

})


app.listen(3000, () => {
    console.log("Listening on port 3000");
})