const path = require('path');
const express = require('express');

const app = express();

const publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));

// route
// app.get('/', (req, res) => {
//     res.send("<h1>Welcome to Oscar's website!<h1>");
// });

// app.get('/about', (req, res) => {
//     res.send("About");
// });

// app.get('/weather', (req, res) => {
//     res.send("Taipei");
// });

// run server
app.listen(3000, () => {
    console.log('server is up on port 3000');
    console.log('http://localhost:3000/');
});