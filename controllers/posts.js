const Post = require('../models/post');

const express = require('express')
const router = express.Router()
const requireLogin = require('../middleware/requireLogin');

router.get('/new', requireLogin, (req, res) => {
    res.render('posts-new');
});

router.post('/new', requireLogin, (req, res) => {
    const post = new Post(req.body);
    post.save().then(() => res.redirect('/'));
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean().populate('comments')
        return res.render('posts-show', {post})
    } catch (err) {
        console.error(err)
    }
});

module.exports = router