const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../server');
const agent = chai.request.agent(app);

const should = chai.should();

describe('site', function () {
    it('Should have home page', function (done) {
        agent
            .get('/')
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                res.should.have.status(200);
                return done();
            });
    });
});