const apiKey = '9d4dc8650ecee2918a65d11cfca4797f';

function getWeather() {
  const city = document.getElementById('city-input').value;

  if (city === '') {
    document.getElementById('error-msg').innerText = 'Please enter a city name.';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        document.getElementById('error-msg').innerText = 'City not found. Try again.';
        return;
      }

      document.getElementById('error-msg').innerText = '';
      document.getElementById('city-name').innerText = data.name;
      document.getElementById('temperature').innerText = data.main.temp + '°C';
      document.getElementById('description').innerText = data.weather[0].description;
      document.getElementById('humidity').innerText = 'Humidity: ' + data.main.humidity + '%';
    })
    .catch(error => {
      document.getElementById('error-msg').innerText = 'Something went wrong. Try again.';
    });
}
