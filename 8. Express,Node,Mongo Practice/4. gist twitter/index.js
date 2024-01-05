const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Tofu',
        comment: 'fuck yoou'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'Noo, fuck yoou'
    },
    {
        id: uuid(),
        username: 'BoiNo',
        comment: 'fuck yoou Tofu'
    },
    {
        id: uuid(),
        username: 'Habibi',
        comment: 'I love Skyler'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    const id = uuid();
    comments.push({ id, username, comment });
    res.redirect('/comments');
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.listen(3000, () => {
    console.log("3000 listening");
})