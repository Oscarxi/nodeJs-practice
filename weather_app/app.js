import request from 'postman-request';

const getAccessKey = () => {
    return '3d20b8e0d78fae05458355d00c6163f3';
}

const getUrl = (city, access_key) => {
        return `http://api.weatherstack.com/current?access_key=${access_key}&query=${city}`;
}

const getWeatherJson = (url, callback) => {
    request({ url: url }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service :(');
        } else if (JSON.parse(response.body).error){
            callback('Unable to find location :(');
        } else {
            const data = JSON.parse(response.body);
            callback(data);
        }
    });
}

const getCurrentWeather = (weatherJson) => {
    const currentWeather = weatherJson.current;

    const descriptions = currentWeather.weather_descriptions;
    const degree = currentWeather.temperature;
    const precip = currentWeather.precip;
    const weather_message = descriptions + '\ndegree: ' + degree + '\nchance of rain: ' + precip + '%\n';

    return weather_message;
}

// main
const city = process.argv[2];
if (!city) {
    console.log('Please provide a city!');
} else {
    const access_key = getAccessKey();
    const url = getUrl(city, access_key);

    getWeatherJson(url, (weatherJson) => {
        const weather_message = getCurrentWeather(weatherJson);
        console.log(weather_message);
    });
}