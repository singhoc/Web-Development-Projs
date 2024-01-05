const express = require("express");
const path = require("path");
const redditData = require('./data.json');
const app = express();

app.set('view engine', 'ejs');
app.set('path', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render(`home.ejs`);
})
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    console.log(data);
    if (data)
        res.render(`home`, { ...data });
    else
        res.render('notfound', { subreddit });
})

app.listen(3000, () => {
    console.log("listening on 3000");
})