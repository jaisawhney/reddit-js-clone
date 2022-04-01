const mongoose = require('mongoose');
assert = require('assert');

const url = process.env.MONGODB_URI || 'mongodb://localhost/reddit-db';
mongoose.connect(url,
    {
        useNewUrlParser: true
    },
    function (err) {
        assert.equal(null, err);
        console.log('Connected successfully to database');
    }
);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;