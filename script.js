const apiKey = 'c5fbee95adf7b27e0fbf34e33b9801d3';

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    const errorDisplay = document.getElementById('error-msg');

    if (!city) {
        errorDisplay.innerText = 'Please enter a city name.';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            errorDisplay.innerText = 'City not found.';
            return;
        }

        errorDisplay.innerText = '';
        document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerText = Math.round(data.main.temp) + '°C';
        document.getElementById('description').innerText = data.weather[0].description;
        document.getElementById('humidity').innerText = `Humidity / 湿度: ${data.main.humidity}%`;
        document.getElementById('wind-speed').innerText = `Wind / 風速: ${data.wind.speed} m/s`;

    } catch (error) {
        errorDisplay.innerText = 'Error fetching data.';
        console.error(error);
    }
}

// Event listener for Enter key
document.getElementById('city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});
