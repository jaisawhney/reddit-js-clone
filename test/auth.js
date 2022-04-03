const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const User = require('../models/user');
const app = require('../server');
const agent = chai.request.agent(app);

const should = chai.should();

describe('User', function () {
    it('should not be able to login if they have not registered', function (done) {
        agent
            .post('/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({email: 'wrong@example.com', password: 'nope'})
            .then(function (res) {
                res.should.have.status(401);
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });

    it('should be able to signup', function (done) {
        User.findOneAndRemove({username: 'testone'}, function () {
            agent
                .post('/sign-up')
                .send({username: 'testUser', password: 'password'})
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    agent.should.have.cookie('nToken');
                    done();
                });
        });
    });
    it('should be able to login', function (done) {
        agent
            .post('/login')
            .send({username: 'testUser', password: 'password'})
            .end(function (err, res) {
                res.should.have.status(200);
                agent.should.have.cookie('nToken');
                done();
            });
    });
    it('should be able to logout', function (done) {
        agent.get('/logout').end(function (err, res) {
            res.should.have.status(200);
            agent.should.not.have.cookie('nToken');
            done();
        });
    });
    after(function (done) {
        User
            .findOneAndDelete({
                username: "testUser",
            })
            .then(function () {
                agent.close();
                done();
            })
            .catch(function (err) {
                done(err);
            });
    });
});