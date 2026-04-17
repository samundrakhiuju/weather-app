const apiKey = 'c5fbee95adf7b27e0fbf34e33b9801d3';

async function getWeather() {
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();
  const errorDisplay = document.getElementById('error-msg');

  if (city === '') {
    errorDisplay.innerText = '都市名を入力してください (Please enter a city name).';
    return;
  }

  const url = `https://api.openweathermap.org/api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
  // Note: If using OpenWeatherMap, use this URL instead:
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '404' || data.error) {
      errorDisplay.innerText = '都市が見つかりませんでした (City not found).';
      clearDisplay();
      return;
    }

    errorDisplay.innerText = '';
    document.getElementById('city-name').innerText = `${data.name || data.location.name}`;
    document.getElementById('temperature').innerText = Math.round(data.main ? data.main.temp : data.current.temperature) + '°C';
    document.getElementById('description').innerText = data.weather ? data.weather[0].description : data.current.weather_descriptions[0];
    document.getElementById('humidity').innerText = `湿度 (Humidity): ${data.main ? data.main.humidity : data.current.humidity}%`;

  } catch (error) {
    errorDisplay.innerText = 'エラーが発生しました。再試行してください。';
    console.error("Fetch error:", error);
  }
}

function clearDisplay() {
  document.getElementById('city-name').innerText = '--';
  document.getElementById('temperature').innerText = '--°C';
  document.getElementById('description').innerText = '--';
  document.getElementById('humidity').innerText = 'Humidity: --%';
}

// Fixed: Correctly closed event listener
document.getElementById('city-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    getWeather();
  }
});
