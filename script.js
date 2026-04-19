const apiKey = 'c5fbee95adf7b27e0fbf34e33b9801d3';

/**
 * Fetches weather data from OpenWeatherMap API
 * and updates the DOM elements.
 */
async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    const errorDisplay = document.getElementById('error-msg');

    // 1. Validation
    if (!city) {
        errorDisplay.innerText = 'Please enter a city name (都市名を入力してください).';
        return;
    }

    // 2. API URL Construction (Units=metric for Celsius, lang=ja for Japanese descriptions)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // 3. Error Handling for API responses
        if (data.cod === '404') {
            errorDisplay.innerText = 'City not found (都市が見つかりません).';
            clearDisplay();
            return;
        } 
        
        if (data.cod === 401) {
            errorDisplay.innerText = 'API Key is not active yet. Please wait 30-60 minutes.';
            return;
        }

        // 4. Success: Clear errors and update UI
        errorDisplay.innerText = '';

        // Update Text Info
        document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').innerText = Math.round(data.main.temp) + '°C';
        document.getElementById('description').innerText = data.weather[0].description;
        document.getElementById('humidity').innerText = `Humidity / 湿度: ${data.main.humidity}%`;
        document.getElementById('wind-speed').innerText = `Wind / 風速: ${data.wind.speed} m/s`;

        // Update Weather Icon
        
        const iconCode = data.weather[0].icon;
        document.getElementById('weather-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">`;

    } catch (error) {
        // 5. Catch Network Errors
        errorDisplay.innerText = 'Network error. Please check your internet connection.';
        console.error("DEBUG INFO:", error);
    }
}

/**
 * Resets the UI to placeholder values
 */
function clearDisplay() {
    document.getElementById('city-name').innerText = '--';
    document.getElementById('temperature').innerText = '--°C';
    document.getElementById('description').innerText = '--';
    document.getElementById('humidity').innerText = 'Humidity / 湿度: --%';
    document.getElementById('wind-speed').innerText = 'Wind / 風速: -- m/s';
    const iconElement = document.getElementById('weather-icon');
    if (iconElement) iconElement.innerHTML = '';
}

/**
 * Event Listener for "Enter" key convenience
 */
document.getElementById('city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});
