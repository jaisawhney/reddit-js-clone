const Post = require('../models/post');
const User = require('../models/user');

const express = require('express')
const router = express.Router()
const requireLogin = require('../middleware/requireLogin');

router.get('/new', requireLogin, (req, res) => {
    res.render('posts-new');
});

router.post('/new', requireLogin, async (req, res) => {
    try {
        const userId = req.user._id
        const post = await new Post(req.body);
        post.author = userId
        post.save();

        const user = await User.findById(userId)
        user.posts.unshift(post);
        user.save();
        return res.redirect(`/posts/${post._id}`);
    } catch (err) {
        console.error(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();
        return res.render('posts-show', {post})
    } catch (err) {
        console.error(err)
    }
});


router.put('/:id/vote-up', requireLogin, (req, res) => {
    Post.findById(req.params.id).then(post => {
        post.upVotes.push(req.user._id);
        post.save();
        return res.sendStatus(200);
    }).catch(err => {
        console.log(err);
    })
});

router.put('/:id/vote-down', requireLogin, (req, res) => {
    Post.findById(req.params.id).then(post => {
        post.downVotes.push(req.user._id);
        post.save();

        return res.sendStatus(200);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router