const express = require('express')
const server = express()

const {engine} = require('express-handlebars');

server.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        ifeq: (one, two, options) => {
            if (one === two) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
}));
server.set('view engine', 'handlebars');
server.use(express.json());
server.use(express.urlencoded({extended: false}));


server.use('/', require('./controllers/main'))
server.use('/posts', require('./controllers/posts'))

require('./data/db');

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('App listening on port 3000!')
});

module.exports = server;