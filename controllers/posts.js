const Post = require('../models/post');

const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('posts-new');
});

router.post('/new', (req, res) => {
    const post = new Post(req.body);
    post.save().then(() => res.redirect('/'));
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean()
        return res.render('posts-show', {post})
    } catch (err) {
        console.error(err)
    }
});

module.exports = router