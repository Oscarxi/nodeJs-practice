import request from 'postman-request';

const accessKey = '3d20b8e0d78fae05458355d00c6163f3';

const getUrl = (city) => {
    return `http://api.weatherstack.com/current?access_key=${accessKey}&query=${city}`;
}

const getWeatherJson = (url) => {
    return new Promise((resolve, reject) => {
        request({ url: url }, (error, response) => {
          if (error) {
            reject(new Error('Unable to connect to weather service :('));
          } else if (JSON.parse(response.body).error) {
            reject(new Error('Unable to find location :('));
          } else {
            const data = JSON.parse(response.body);
            resolve(data);
          }
        });
      });
}

const getCurrentWeather = (weatherJson) => {
    const currentWeather = weatherJson.current;

    const descriptions = currentWeather.weather_descriptions;
    const degree = currentWeather.temperature;
    const precip = currentWeather.precip;
    const weatherMessage = {
        'descriptions': descriptions,
        'degree': degree,
        'precip': precip,
    }

    return weatherMessage;
}

async function forecast(location) {
    try {
      const url = getUrl(location);
      const weatherJson = await getWeatherJson(url);
      const weatherMessage = getCurrentWeather(weatherJson);
      return weatherMessage;
    } catch (error) {
      return 'Unable to get weather information';
    }
}

export { forecast };