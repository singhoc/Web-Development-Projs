const express = require("express");
const app = express();

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    console.log(`Yay bitch got requested for subreddit ?${subreddit}!!`);
    res.send(`<h1>bitch, you asked for subreddit ${subreddit} ????</h1>`);
})
app.get('/cats', (req, res) => {
    console.log("Yay cat got requested!!");
    res.send('<h1>bitch, you asked for meow?</h1>');
})
app.get('/dogs', (req, res) => {
    console.log("Yay dog got requested!!");
    res.send('<h1>bitch, you asked for woof?</h1>');
})
app.listen(3000, () => {
    console.log("listening of port 3000");
})