const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const {engine} = require('express-handlebars');

app.engine('handlebars', engine({
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
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render('home');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port 3000!')
});