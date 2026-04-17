const apiKey = 'c5fbee95adf7b27e0fbf34e33b9801d3';

/**
 * Main function to fetch weather data
 * Using async/await for better readability and error handling
 */
async function getWeather() {
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();
  const errorDisplay = document.getElementById('error-msg');

  // 1. Validation: Check if input is empty
  if (city === '') {
    errorDisplay.innerText = '都市名を入力してください (Please enter a city name).';
    return;
  }

  // 2. URL Construction: Added &lang=ja for Japanese descriptions
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // 3. Check for "City Not Found" or other API errors
    if (data.cod === '404') {
      errorDisplay.innerText = '都市が見つかりませんでした (City not found).';
      clearDisplay();
      return;
    }

    // 4. Success: Update the UI
    errorDisplay.innerText = '';
    document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = Math.round(data.main.temp) + '°C';
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `湿度 (Humidity): ${data.main.humidity}%`;
    
    // Optional: Add wind speed since your HTML has it
    if(document.getElementById('wind-speed')) {
        document.getElementById('wind-speed').innerText = `風速 (Wind): ${data.wind.speed} m/s`;
    }

  } catch (error) {
    // 5. Catch network errors (like no internet)
    errorDisplay.innerText = 'エラーが発生しました。再試行してください。';
    console.error("Fetch error:", error);
  }
}

// Function to reset the display on error
function clearDisplay() {
  document.getElementById('city-name').innerText = '--';
  document.getElementById('temperature').innerText = '--°C';
  document.getElementById('description').innerText = '--';
  document.getElementById('humidity').innerText = 'Humidity: --%';
}

// Add event listener for the "Enter" key for better User Experience (UX)
document.getElementById('city-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    getWeather();
  }
});
