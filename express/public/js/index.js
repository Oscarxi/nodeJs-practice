const weatherForm = document.querySelector('form.location-submission');
const filter = document.querySelector('#location-value');
const description = document.querySelector('#description');
const temperature = document.querySelector('#temperature');
const precipitation = document.querySelector('#precipitation');
const weatherIcon = document.querySelector('#weatherIcon');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = filter.value;
    description.textContent = 'Loading...';
    temperature.textContent = '';
    precipitation.textContent = '';
    weatherIcon.src = '';

    fetch(`/weather?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                const weatherInformation = data.weatherInformation;

                if (!weatherInformation.description) {
                    description.textContent = weatherInformation;
                    return;
                }

                description.textContent = `weather: ${weatherInformation.description}`;
                temperature.textContent = `degree: ${weatherInformation.degree}`;
                precipitation.textContent = `precipitation: ${weatherInformation.precipitation}`;
                weatherIcon.src = weatherInformation.weatherIcon;
            });
        }
    );
})