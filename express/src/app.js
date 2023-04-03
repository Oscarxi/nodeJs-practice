const express = require('express');
const app = express();
const port = 3000;

// route
app.get('/', (req, res) => {
    res.send("Welcome to Oscar's website!");
});

app.get('/help', (req, res) => {
    res.send("Help Page");
});

app.get('/about', (req, res) => {
    res.send("About");
});

app.get('/weather', (req, res) => {
    res.send("Taipei");
});

// run server
app.listen(3000, () => {
    console.log('server is up on port 3000');
    console.log('http://localhost:3000/');
});