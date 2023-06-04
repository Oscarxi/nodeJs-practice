import { forecast } from './WeatherService.js';
import path from 'path';
import express from 'express';
import hbs from 'hbs';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'You must provide an address',
        });
    }

    forecast(req.query.address)
        .then(weather => {
            return res.send({
                location: req.query.address,
                weather: weather,
            });
        })
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