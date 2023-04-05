const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../views/partials');

app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

// route
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found'
    });
});

// run server
app.listen(3000, () => {
    console.log('server is up on port 3000');
    console.log('http://localhost:3000/');
});