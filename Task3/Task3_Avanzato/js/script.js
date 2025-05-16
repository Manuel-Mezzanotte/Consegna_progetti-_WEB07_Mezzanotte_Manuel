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
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m`;
  const res = await fetch(url);
  if (!res.ok) throw new Error();
  return res.json();
}

const loaderEl   = document.getElementById('loader');
const contentEl  = document.getElementById('content');
const refreshBtn = document.getElementById('refresh');
const hourlyList = document.querySelector('.hourly-list');
const ctx        = document.getElementById('temp-chart').getContext('2d');
let tempChart;

async function showWeather() {
  loaderEl.style.display  = 'block';
  contentEl.style.display = 'none';
  try {
    const { lat, lon } = await getUserLocation();
    const data = await getWeather(lat, lon);
    document.querySelector('.location').textContent = data.timezone;
    document.querySelector('.icon').textContent     = data.current_weather.weathercode === 0 ? '☀️' : '☁️';
    document.querySelector('.temp').textContent     = `${data.current_weather.temperature}°C`;
    document.querySelector('.humidity').textContent = `Umidità: ${data.hourly.relativehumidity_2m[0]}%`;
    document.querySelector('.wind').textContent     = `Vento: ${data.current_weather.windspeed} km/h`;
    hourlyList.innerHTML = data.hourly.time.slice(0,24).map((t,i) => {
      const hour = new Date(t).getHours().toString().padStart(2,'0');
      return `<li>${hour}:00<br>${data.hourly.temperature_2m[i]}°C</li>`;
    }).join('');
    const labels = data.hourly.time.slice(0,24).map(t => new Date(t).getHours()+':00');
    const temps  = data.hourly.temperature_2m.slice(0,24);
    if (tempChart) tempChart.destroy();
    tempChart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: [{ data: temps, fill: false, tension: 0.1 }] },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
    loaderEl.style.display  = 'none';
    contentEl.style.display = 'block';
  } catch {
    loaderEl.textContent = 'Errore nel caricamento meteo';
  }
}

refreshBtn.addEventListener('click', showWeather);
showWeather();
