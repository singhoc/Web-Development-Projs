const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/auth-demo');
    console.log("connected to mongoose");
}
const db = mongoose.connection;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'This is my secret', saveUninitialized: true, resave: true }))

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

app.get('/', (req, res) => {
    res.send('Homepage')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/')
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // const user = await User.findOne({ username });
    // const validpw = await bcrypt.compare(password, user.password);
    const user = await User.findAndValidate(username, password);
    if (user) {
        req.session.user_id = user._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }

})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    req.session.destroy();//to destroy the session entirely
    res.redirect('/login')
})

app.get('/secret', requireLogin, (req, res) => {
    // if (!req.session.user_id) {
    //     return res.redirect('/login')
    // }
    res.render('secret.ejs')
})



app.listen(3000, () => {
    console.log("listening on 3000")
})