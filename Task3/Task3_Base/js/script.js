const locationEl = document.querySelector('.location');
const iconEl     = document.querySelector('.icon');
const tempEl     = document.querySelector('.temp');
const humidityEl = document.querySelector('.humidity');
const windEl     = document.querySelector('.wind');
const refreshBtn = document.getElementById('refresh');

async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fetch fallita');
  const data = await res.json();
  return data.current_weather;
}

async function showWeather() {
  locationEl.textContent = "Rovereto";
  const weather = await getWeather(46.07, 11.12);
  iconEl.textContent     = weather.weathercode === 0 ? "☀️" : "☁️";
  tempEl.textContent     = `${weather.temperature}°C`;
  humidityEl.textContent = `Umidità: ${weather.relativehumidity_2m ?? '--'}%`;
  windEl.textContent     = `Vento: ${weather.windspeed} km/h`;
}

refreshBtn.addEventListener('click', showWeather);

showWeather().catch(err => console.error(err));
