import request from 'postman-request';

const getAccessKey = () => {
    return '3d20b8e0d78fae05458355d00c6163f3';
}

const getUrl = (access_key, city) => {
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${city}`
    return url;
}

const getWeather = (city, callback) => {
    const access_key = getAccessKey();
    const url = getUrl(access_key, city);

    request({ url: url }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service :(');
        } else if (JSON.parse(response.body).error){
            callback('Unable to find location :(');
        } else {
            const data = JSON.parse(response.body);
            const currentWeather = data.current;

            const descriptions = currentWeather.weather_descriptions;
            const degree = currentWeather.temperature;
            const precip = currentWeather.precip;
            const weather = descriptions + '\ndegree: ' + degree + '\nchance of rain: ' + precip + '%\n';

            callback(city + ':\n' + weather);
        }
    });
}

const city = 'Taipei';
getWeather(city, (weather) => {
    console.log(weather);
});