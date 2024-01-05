const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");

app.set('view engine', 'ejs');
app.set('path', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        app.render('reddit.ejs', { ...data });
    } else {
        res.send("<h1>This is no subreddit</h1>");
    }
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})