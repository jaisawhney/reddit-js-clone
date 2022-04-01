const Post = require('../models/post');

const express = require('express')
const router = express.Router()

router.get('/posts/new', (req, res) => {
    res.render('posts-new');
});

router.post('/posts/new', (req, res) => {
    const post = new Post(req.body);
    post.save().then(() => res.redirect('/'));
});

module.exports = router