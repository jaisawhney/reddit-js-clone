const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const Post = require('../models/post');
const app = require('../server');
const agent = chai.request.agent(app);

const should = chai.should();


describe('Posts', function () {
    const newPost = {
        title: 'post title',
        url: 'https://www.google.com',
        summary: 'post summary'
    };
    it('should create with valid attributes at POST /posts/new', function (done) {
        Post.estimatedDocumentCount()
            .then(function (initialDocCount) {
                agent
                    .post('/posts/new')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(newPost)
                    .then(function (res) {
                        Post.estimatedDocumentCount()
                            .then(function (newDocCount) {
                                res.should.have.status(200);
                                newDocCount.should.equal(initialDocCount + 1)
                                done();
                            })
                            .catch(function (err) {
                                done(err);
                            });
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })
            .catch(function (err) {
                done(err);
            });
    });
    after(function () {
        Post.findOneAndDelete(newPost);
    });
});