function getUserLocation() {
  return new Promise(resolve => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => resolve({ lat: 46.07, lon: 11.12 })
      );
    } else {
      resolve({ lat: 46.07, lon: 11.12 });
    }
  });
}

async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Errore nel caricamento dei dati meteo');
  return res.json();
}

function getWeatherIcon(code) {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅️';
  if (code <= 48) return '🌫️';
  if (code <= 55) return '🌧️';
  if (code <= 57) return '❄️🌧️';
  if (code <= 65) return '🌧️';
  if (code <= 67) return '❄️🌧️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌦️';
  if (code <= 86) return '🌨️';
  if (code === 95) return '⛈️';
  return '🌩️';
}

function getWeatherDescription(code) {
  if (code === 0) return 'Cielo sereno';
  if (code === 1) return 'Prevalentemente sereno';
  if (code === 2) return 'Parzialmente nuvoloso';
  if (code === 3) return 'Nuvoloso';
  if (code === 45 || code === 48) return 'Nebbia';
  if (code >= 51 && code <= 55) return 'Pioviggine';
  if (code === 56 || code === 57) return 'Pioviggine congelata';
  if (code >= 61 && code <= 65) return 'Pioggia';
  if (code === 66 || code === 67) return 'Pioggia congelata';
  if (code >= 71 && code <= 75) return 'Neve';
  if (code === 77) return 'Granelli di neve';
  if (code >= 80 && code <= 82) return 'Rovesci di pioggia';
  if (code === 85 || code === 86) return 'Rovesci di neve';
  if (code === 95) return 'Temporale';
  return 'Temporale con grandine';
}

const loaderEl = document.getElementById('loader');
const contentEl = document.getElementById('content');
const refreshBtn = document.getElementById('refresh');
const hourlyList = document.querySelector('.hourly-list');
const weeklyGrid = document.querySelector('.weekly-grid');
const themeToggle = document.getElementById('theme-toggle');
const infoToggle = document.getElementById('info-toggle');
const weatherInfo = document.getElementById('weather-info');
const closeModal = document.querySelector('.close');
const ctx = document.getElementById('temp-chart').getContext('2d');
let tempChart;

async function showWeather() {
  loaderEl.style.display = 'block';
  contentEl.style.display = 'none';
  try {
    const { lat, lon } = await getUserLocation();
    const data = await getWeather(lat, lon);

    const currentWeatherCode = data.current_weather.weathercode;
    const icon = getWeatherIcon(currentWeatherCode);
    const description = getWeatherDescription(currentWeatherCode);

    document.querySelector('.location').textContent = data.timezone.replace('_', ' ');
    document.querySelector('.icon').textContent = icon;
    document.querySelector('.temp').textContent = `${Math.round(data.current_weather.temperature)}°C`;
    document.querySelector('.humidity').textContent = `Umidità: ${data.hourly.relativehumidity_2m[0]}%`;
    document.querySelector('.wind').textContent = `Vento: ${data.current_weather.windspeed} km/h`;
    document.querySelector('.weather-description').textContent = description;

    hourlyList.innerHTML = data.hourly.time.slice(0, 24).map((t, i) => {
      const h = new Date(t).getHours().toString().padStart(2, '0');
      const hourlyTemp = Math.round(data.hourly.temperature_2m[i]);
      return `<li>${h}:00<br>${hourlyTemp}°C</li>`;
    }).join('');

    const labels = data.hourly.time.slice(0, 24).map(t => new Date(t).getHours() + ':00');
    const temps = data.hourly.temperature_2m.slice(0, 24);

    if (tempChart) tempChart.destroy();
    tempChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: temps,
          fill: false,
          borderColor: '#007BFF',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    });

    weeklyGrid.innerHTML = data.daily.time.map((d, i) => {
      const day = new Date(d).toLocaleDateString('it', { weekday: 'short' });
      const max = Math.round(data.daily.temperature_2m_max[i]);
      const min = Math.round(data.daily.temperature_2m_min[i]);
      const code = data.daily.weathercode[i];
      const icon = getWeatherIcon(code);
      return `<div class="day-card">
                <div class="day-name">${day}</div>
                <div class="day-icon">${icon}</div>
                <div class="day-temp">${max}°/${min}°</div>
              </div>`;
    }).join('');

    loaderEl.style.display = 'none';
    contentEl.style.display = 'block';
  } catch (error) {
    loaderEl.textContent = 'Errore nel caricamento meteo';
    console.error('Errore:', error);
  }
}

refreshBtn.addEventListener('click', showWeather);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

infoToggle.addEventListener('click', () => {
  weatherInfo.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  weatherInfo.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === weatherInfo) {
    weatherInfo.style.display = 'none';
  }
});

showWeather();
