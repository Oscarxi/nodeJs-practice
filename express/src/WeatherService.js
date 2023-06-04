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
    const precipitation = currentWeather.precip;
    const weatherIcon = currentWeather.weather_icons;
    const weatherInformation = {
        'description': descriptions[0],
        'degree': degree,
        'precipitation': precipitation,
        'weatherIcon': weatherIcon[0]
    }

    return weatherInformation;
}

async function forecast(location) {
    try {
      const url = getUrl(location);
      const weatherJson = await getWeatherJson(url);
      const weatherInformation = getCurrentWeather(weatherJson);

      return weatherInformation;
    } catch (error) {
      return 'Unable to get weather information';
    }
}

export { forecast };