const express = require("express");
const app = express();
const path = require("path");

app.set('view engine', 'ejs');
app.set('path', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('get_post');
})

app.get('/gay', (req, res) => {
    res.send("<h1>you got served</h1>");
})

app.post('/lesbian', (req, res) => {
    console.log(req.body);
    const { meat, qty } = req.body;
    res.send(`<h1>I got served ${meat} of ${qty} times.</h1>`)
})

app.listen(3000, () => {
    console.log("Connected to port 3000!");
})