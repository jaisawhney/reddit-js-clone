const Post = require('../models/post');
const Comment = require('../models/comment');

const express = require('express')
const router = express.Router({ mergeParams: true })

router.post('/', async (req, res) => {
    try {
        const comment = await new Comment(req.body);
        comment.save()
        const post = await Post.findById(req.params.postId)
        post.comments.unshift(comment);
        post.save();
        return res.redirect('/posts/req.params.postId')
    } catch (err) {
        console.error(err)
    }
});

module.exports = router