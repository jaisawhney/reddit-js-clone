const cookieParser = require('cookie-parser');
const express = require('express')
const app = express()
const checkAuth = require('./middleware/checkAuth');

const {engine} = require('express-handlebars');

app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        subtract: (one, two) => {
            return one - two || 0
        }
    }
}));

// Middleware
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuth);
app.use(express.static('public'))

// Routes
app.use('/', require('./controllers/main'))
app.use('/', require('./controllers/auth'))
app.use('/n', require('./controllers/subreddits'))
app.use('/posts', require('./controllers/posts'))
app.use('/posts/:postId/comments', require('./controllers/comments'))
app.use('/posts/:postId/comments/:commentId', require('./controllers/replies'))

require('./data/db');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port 3000!')
});

module.exports = app;
